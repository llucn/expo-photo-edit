package com.deltasoft365.photoedit

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.reactnativephotoeditor.activity.PhotoEditorActivity
import com.reactnativephotoeditor.activity.constant.ResponseCode
import expo.modules.kotlin.Promise

class ExpoPhotoEditModule : Module() {
  private val EDIT_SUCCESSFUL = 1
  private var promise: Promise? = null

  override fun definition() = ModuleDefinition {
    Name("ExpoPhotoEdit")

    AsyncFunction("open") { options: ReadableMap?, promise: Promise ->
      this@ExpoPhotoEditModule.promise = promise
      val activity = this@ExpoPhotoEditModule.appContext.currentActivity
      if (activity == null) {
        promise.reject("ACTIVITY_DOES_NOT_EXIST", "Activity doesn't exist", null)
        return@AsyncFunction
      }
      val context = appContext.reactContext as ReactApplicationContext
      val intent = Intent(context, PhotoEditorActivity::class.java)
      context.addActivityEventListener(mActivityEventListener)

      val path = options?.getString("path")
      val stickers = options?.getArray("stickers") as ReadableArray

      intent.putExtra("path", path)
      intent.putExtra("stickers", stickers.toArrayList())

      activity.startActivityForResult(intent, EDIT_SUCCESSFUL)
    }
  }

  private val mActivityEventListener: ActivityEventListener = object : BaseActivityEventListener() {
    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, intent: Intent?) {
      if (requestCode == EDIT_SUCCESSFUL) {
        when (resultCode) {
          ResponseCode.RESULT_OK -> {
            val path = intent?.getStringExtra("path")
            promise?.resolve("file://$path")
          }
          ResponseCode.RESULT_CANCELED -> {
            promise?.reject("USER_CANCELLED", "User has cancelled", null)
          }
          ResponseCode.LOAD_IMAGE_FAILED -> {
            val path = intent?.getStringExtra("path")
            promise?.reject("LOAD_IMAGE_FAILED", "Load image failed: $path", null)
          }
          
        }
      }
    }
  }
}
