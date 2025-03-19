import Foundation
import UIKit
import Photos
import SDWebImage
import AVFoundation
//import ZLImageEditor
import ExpoModulesCore

public class ExpoPhotoEditModule: Module {
  var window: UIWindow?
  var bridge: RCTBridge!
  
  var promise: Promise!
  var delegate: EditImageDelegate!
  
  public func definition() -> ModuleDefinition {
    Name("ExpoPhotoEdit")
    
    AsyncFunction("open") { (options: PhotoEditOptions, promise: Promise) in
      
      // handle path
      guard let path = options.path else {
        promise.reject("DONT_FIND_IMAGE", "Dont find image")
        return;
      }
      
      self.delegate = EditImageDelegate()
      self.delegate.promise = promise

      getUIImage(url: path) { image in
          DispatchQueue.main.async {
              //  set config
              self.setConfiguration(options: options, promise: promise)
              self.presentController(image: image)
          }
      } reject: {_ in
          promise.reject("LOAD_IMAGE_FAILED", "Load image failed: " + path)
      }
    }
    
  }
  
  private func setConfiguration(options: PhotoEditOptions, promise: Promise) -> Void{
      self.promise = promise;
      
      // Stickers
      let stickers = options.stickers ?? []
      ZLImageEditorConfiguration.default().imageStickerContainerView = StickerView(stickers: stickers)
      
      
      //Config
      ZLImageEditorConfiguration.default().editDoneBtnBgColor = UIColor(red:255/255.0, green:238/255.0, blue:101/255.0, alpha:1.0)

      ZLImageEditorConfiguration.default().editImageTools = [.draw, .clip, .filter, .imageSticker, .textSticker]
      
      //Filters Lut
      do {
          let filters = ColorCubeLoader()
          ZLImageEditorConfiguration.default().filters = try filters.load()
      } catch {
          assertionFailure("\(error)")
      }
  }
  
  private func presentController(image: UIImage) {
      if let controller = UIApplication.getTopViewController() {
          controller.modalTransitionStyle = .crossDissolve
          
        ZLEditImageViewController.showEditImageVC(parentVC:controller , image: image, delegate: self.delegate) { [weak self] (resImage, editModel) in
              let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0] as String
              
              let destinationPath = URL(fileURLWithPath: documentsPath).appendingPathComponent(String(Int64(Date().timeIntervalSince1970 * 1000)) + ".png")
              
              do {
                  try resImage.pngData()?.write(to: destinationPath)
                  self?.promise.resolve(destinationPath.absoluteString)
              } catch {
                  debugPrint("writing file error", error)
              }
          }
      }
  }
  
  
  private func getUIImage (url: String ,completion:@escaping (UIImage) -> (), reject:@escaping(String)->()){
      if let path = URL(string: url) {
          SDWebImageManager.shared.loadImage(with: path, options: .continueInBackground, progress: { (recieved, expected, nil) in
          }, completed: { (downloadedImage, data, error, SDImageCacheType, true, imageUrlString) in
              DispatchQueue.main.async {
                  if(error != nil){
                      print("error", error as Any)
                      reject("false")
                      return;
                  }
                  if downloadedImage != nil{
                      completion(downloadedImage!)
                  }
              }
          })
      }else{
          reject("false")
      }
  }

}

internal class EditImageDelegate: NSObject, ZLEditImageControllerDelegate {
  var promise: Promise!
  
  public func onCancel() {
    self.promise.reject("USER_CANCELLED", "User has cancelled")
  }
}

internal struct PhotoEditOptions: Record {
  @Field
  var path: String?
  
  @Field
  var stickers: [String]?
}
