export type ActivityType = "like" | "comment" | "follow" | "view" | "repost" | "reply" | "signup" | "pin" | "report"

export type Activity = {
  id: string
  type: ActivityType
  fromUserId: string
  toUserId?: string
  postId?: string
  commentId?: string
  createdAt: string
  read: boolean
  metadata?: Record<string, any>
}

export type ActivityLogFilters = {
  startDate?: Date
  endDate?: Date
  types?: ActivityType[]
  userId?: string
}

export type ActivityLog = {
  id: string
  userId: string
  action: string
  target: string
  targetId: string
  timestamp: string
  ipAddress?: string
  deviceInfo?: string
}

export type TrendingTopic = {
  id: string
  name: string
  postCount: number
  recentPosts: string[] // Post IDs
}

export type UserRecommendation = {
  userId: string
  score: number
  reason: "mutual_followers" | "similar_interests" | "popular" | "new_user"
}

export type ReportReason = "spam" | "harassment" | "inappropriate_content" | "impersonation" | "other"

export type Report = {
  id: string
  reporterId: string
  targetType: "post" | "user" | "comment"
  targetId: string
  reason: ReportReason
  description?: string
  status: "pending" | "reviewed" | "resolved" | "dismissed"
  createdAt: string
  updatedAt?: string
  reviewerId?: string
}
