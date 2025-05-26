"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { AuthBanner } from "../components/auth-banner"
import { useAuth } from "../context/auth-context"
import { ChangePasswordForm } from "../components/change-password-form"
import { ImageCropper } from "../components/image-cropper"
import { User, Lock, Bell, Shield, LogOut, Save, Upload, Trash2, X, AlertTriangle } from "lucide-react"

export default function Settings() {
  const { user, isLoading, logout, updateProfile } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("profile")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [email, setEmail] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState("")
  const [showImageCropper, setShowImageCropper] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    directMessages: true,
    emailNotifications: false,
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    allowMessages: "followers",
    showActivity: true,
    showFollowers: true,
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      setUsername(user.username)
      setBio(user.bio || "")
      setEmail(user.email)

      // In a real app, these settings would be fetched from the server
      // For now, we'll use default values
    }
  }, [user, isLoading, router])

  const handleSaveProfile = () => {
    updateProfile({
      username,
      bio,
    })

    setIsEditing(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTempImageUrl(reader.result)
        setShowImageCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCroppedImage = (croppedImageUrl) => {
    updateProfile({
      profileImage: croppedImageUrl,
    })
    setShowImageCropper(false)
    setTempImageUrl("")
  }

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    logout()
    router.push("/")
  }

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <AuthBanner />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AuthBanner />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Sidebar */}
                <div className="md:w-64 bg-gray-50 p-4 border-r">
                  <h1 className="text-xl font-bold mb-6">Settings</h1>

                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                        activeTab === "profile" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-200"
                      }`}
                    >
                      <User size={18} className="mr-3" />
                      Profile
                    </button>

                    <button
                      onClick={() => setActiveTab("security")}
                      className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                        activeTab === "security" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-200"
                      }`}
                    >
                      <Lock size={18} className="mr-3" />
                      Security
                    </button>

                    <button
                      onClick={() => setActiveTab("notifications")}
                      className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                        activeTab === "notifications" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-200"
                      }`}
                    >
                      <Bell size={18} className="mr-3" />
                      Notifications
                    </button>

                    <button
                      onClick={() => setActiveTab("privacy")}
                      className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                        activeTab === "privacy" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-200"
                      }`}
                    >
                      <Shield size={18} className="mr-3" />
                      Privacy
                    </button>

                    <hr className="my-4" />

                    <button
                      onClick={logout}
                      className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut size={18} className="mr-3" />
                      Log Out
                    </button>
                  </nav>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  {/* Profile tab */}
                  {activeTab === "profile" && (
                    <div>
                      <h2 className="text-xl font-bold mb-6">Profile Settings</h2>

                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Profile Picture</h3>
                          <input
                            type="file"
                            id="profile-image"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <label
                            htmlFor="profile-image"
                            className="cursor-pointer px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center"
                          >
                            <Upload size={14} className="mr-1" />
                            Change Photo
                          </label>
                        </div>

                        <div className="flex justify-center">
                          <div className="relative">
                            <Image
                              src={user.profileImage || "/placeholder.svg"}
                              alt={user.username}
                              width={120}
                              height={120}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {isEditing ? (
                          <>
                            <div>
                              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                              </label>
                              <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                              </label>
                              <input
                                id="email"
                                type="email"
                                value={email}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Email cannot be changed. Contact support for assistance.
                              </p>
                            </div>

                            <div>
                              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                                Bio
                              </label>
                              <textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Tell us about yourself..."
                              />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                              <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                              >
                                <X size={16} className="mr-1" />
                                Cancel
                              </button>
                              <button
                                onClick={handleSaveProfile}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                              >
                                <Save size={16} className="mr-1" />
                                Save Changes
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <h3 className="text-sm font-medium text-gray-700">Username</h3>
                              <p className="mt-1">{username}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-gray-700">Email</h3>
                              <p className="mt-1">{email}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-gray-700">Bio</h3>
                              <p className="mt-1">{bio || "No bio yet."}</p>
                            </div>

                            <div className="flex justify-end mt-6">
                              <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                              >
                                Edit Profile
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Security tab */}
                  {activeTab === "security" && (
                    <div>
                      <h2 className="text-xl font-bold mb-6">Security Settings</h2>

                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Password</h3>
                          <p className="text-gray-600 mb-4">
                            It's a good idea to use a strong password that you don't use elsewhere
                          </p>
                          <button
                            onClick={() => setShowPasswordForm(true)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Change Password
                          </button>
                        </div>

                        <hr />

                        <div>
                          <h3 className="font-medium mb-2">Account Deletion</h3>
                          <p className="text-gray-600 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications tab */}
                  {activeTab === "notifications" && (
                    <div>
                      <h2 className="text-xl font-bold mb-6">Notification Settings</h2>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Likes</h3>
                            <p className="text-sm text-gray-600">Get notified when someone likes your post</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.likes}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  likes: !notificationSettings.likes,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Comments</h3>
                            <p className="text-sm text-gray-600">Get notified when someone comments on your post</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.comments}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  comments: !notificationSettings.comments,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Follows</h3>
                            <p className="text-sm text-gray-600">Get notified when someone follows you</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.follows}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  follows: !notificationSettings.follows,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Mentions</h3>
                            <p className="text-sm text-gray-600">Get notified when someone mentions you</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.mentions}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  mentions: !notificationSettings.mentions,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Direct Messages</h3>
                            <p className="text-sm text-gray-600">Get notified when you receive a direct message</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.directMessages}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  directMessages: !notificationSettings.directMessages,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <hr />

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Email Notifications</h3>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.emailNotifications}
                              onChange={() =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  emailNotifications: !notificationSettings.emailNotifications,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex justify-end mt-6">
                          <button
                            onClick={() => alert("Settings saved!")}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                          >
                            <Save size={16} className="mr-1" />
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy tab */}
                  {activeTab === "privacy" && (
                    <div>
                      <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>

                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Profile Visibility</h3>
                          <p className="text-gray-600 mb-3">Control who can see your profile</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value="public"
                                checked={privacySettings.profileVisibility === "public"}
                                onChange={() =>
                                  setPrivacySettings({
                                    ...privacySettings,
                                    profileVisibility: "public",
                                  })
                                }
                                className="mr-2"
                              />
                              <span>Public - Anyone can see your profile</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value="followers"
                                checked={privacySettings.profileVisibility === "followers"}
                                onChange={() =>
                                  setPrivacySettings({
                                    ...privacySettings,
                                    profileVisibility: "followers",
                                  })
                                }
                                className="mr-2"
                              />
                              <span>Followers Only - Only people who follow you can see your profile</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value="private"
                                checked={privacySettings.profileVisibility === "private"}
                                onChange={() =>
                                  setPrivacySettings({
                                    ...privacySettings,
                                    profileVisibility: "private",
                                  })
                                }
                                className="mr-2"
                              />
                              <span>Private - Only you can see your profile</span>
                            </label>
                          </div>
                        </div>

                        <hr />

                        <div>
                          <h3 className="font-medium mb-2">Direct Messages</h3>
                          <p className="text-gray-600 mb-3">Control who can send you direct messages</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="allowMessages"
                                value="everyone"
                                checked={privacySettings.allowMessages === "everyone"}
                                onChange={() =>
                                  setPrivacySettings({
                                    ...privacySettings,
                                    allowMessages: "everyone",
                                  })
                                }
                                className="mr-2"
                              />
                              <span>Everyone</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="allowMessages"
                                value="followers"
                                checked={privacySettings.allowMessages === "followers"}
                                onChange={() =>
                                  setPrivacySettings({
                                    ...privacySettings,
                                    allowMessages: "followers",
                                  })
                                }
                                className="mr-2"
                              />
                              <span>Followers Only</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="allowMessages"
                                value="nobody"
                                checked={privacySettings.allowMessages === "nobody"}
                                onChange={() =>
                                  setPrivacySettings({
                                    ...privacySettings,
                                    allowMessages: "nobody",
                                  })
                                }
                                className="mr-2"
                              />
                              <span>Nobody</span>
                            </label>
                          </div>
                        </div>

                        <hr />

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Show Activity Status</h3>
                            <p className="text-sm text-gray-600">Let others see when you're active</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacySettings.showActivity}
                              onChange={() =>
                                setPrivacySettings({
                                  ...privacySettings,
                                  showActivity: !privacySettings.showActivity,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Show Followers and Following</h3>
                            <p className="text-sm text-gray-600">Let others see who you follow and who follows you</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacySettings.showFollowers}
                              onChange={() =>
                                setPrivacySettings({
                                  ...privacySettings,
                                  showFollowers: !privacySettings.showFollowers,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex justify-end mt-6">
                          <button
                            onClick={() => alert("Settings saved!")}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                          >
                            <Save size={16} className="mr-1" />
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Password change modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <ChangePasswordForm onClose={() => setShowPasswordForm(false)} />
        </div>
      )}

      {/* Image cropper */}
      {showImageCropper && tempImageUrl && (
        <ImageCropper
          imageUrl={tempImageUrl}
          onCrop={handleCroppedImage}
          onCancel={() => {
            setShowImageCropper(false)
            setTempImageUrl("")
          }}
        />
      )}

      {/* Delete account confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center mb-4 text-red-600">
              <AlertTriangle size={24} className="mr-2" />
              <h2 className="text-xl font-bold">Delete Account</h2>
            </div>

            <p className="mb-4">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be
              permanently removed.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                <X size={16} className="mr-1" />
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Trash2 size={16} className="mr-1" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
