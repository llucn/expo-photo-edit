require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'ExpoPhotoEdit'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platforms      = {
    :ios => '15.1',
    :tvos => '15.1'
  }
  s.swift_version = ['5.0', '5.1', '5.2']
  s.source         = { git: 'https://github.com/Delta-Software-365/delta_expo-photo-edit' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.dependency "SDWebImage", "~> 5.11.1"
  s.dependency 'SDWebImageWebPCoder', '~> 0.8.4'

  s.subspec 'ZLImageEditor' do |zl|
    zl.name             = "ZLImageEditor"
    zl.source_files     = "ZLImageEditor/Sources/*.{h,m,mm,swift}"
    zl.exclude_files    = "ZLImageEditor/Sources/ZLImageEditor.h"
    zl.resources        = "ZLImageEditor/Sources/*.{png,bundle}"
    zl.requires_arc     = true
    zl.frameworks       = "UIKit", "Accelerate"
  end

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
