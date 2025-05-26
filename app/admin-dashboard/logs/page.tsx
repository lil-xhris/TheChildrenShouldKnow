"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { AuthBanner } from "../../components/auth-banner"
import { useAuth } from "../../context/auth-context"
import {
  Calendar,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  Clock,
  User,
  Activity,
  AlertTriangle,
  Shield,
  Trash,
  Edit,
  UserPlus,
  LogOut,
  FileText,
  Eye,
} from "lucide-react"

type LogEntry = {
  id: string
  adminId: string
  adminName: string
  action: string
  target: string
  targetId: string
  details?: string
  timestamp: string
  ipAddress?: string
}

export default function AdminLogs() {
  const { user, isLoading, isAdmin, getAllUsers } = useAuth()
  const router = useRouter()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState<{ start?: string; end?: string }>({})

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin())) {
      router.push("/admin-login")
    }

    // Generate mock logs data
    if (user && isAdmin()) {
      const mockLogs: LogEntry[] = generateMockLogs()
      setLogs(mockLogs)
      setFilteredLogs(mockLogs)
    }
  }, [user, isLoading, router, isAdmin])

  // Generate mock logs for demonstration
  const generateMockLogs = (): LogEntry[] => {
    const actions = [
      "user_login",
      "user_logout",
      "user_create",
      "user_delete",
      "user_update",
      "post_create",
      "post_delete",
      "post_update",
      "post_view",
      "comment_delete",
      "system_setting_update",
      "report_review",
    ]

    const targets = ["user", "post", "comment", "system", "report"]

    const mockLogs: LogEntry[] = []

    // Generate 50 random log entries
    for (let i = 0; i < 50; i++) {
      const action = actions[Math.floor(Math.random() * actions.length)]
      const target = targets[Math.floor(Math.random() * targets.length)]
      const timestamp = new Date()
      timestamp.setDate(timestamp.getDate() - Math.floor(Math.random() * 30)) // Random date in the last 30 days

      mockLogs.push({
        id: `log_${i}_${Date.now()}`,
        adminId: "admin",
        adminName: "WRITER",
        action,
        target,
        targetId: `${target}_${Math.floor(Math.random() * 1000)}`,
        details: `${action} performed on ${target}`,
        timestamp: timestamp.toISOString(),
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      })
    }

    // Add some specific logs for better demonstration
    mockLogs.push({
      id: `log_specific_1`,
      adminId: "admin",
      adminName: "WRITER",
      action: "user_delete",
      target: "user",
      targetId: "user_123",
      details: "Deleted user account due to violation of community guidelines",
      timestamp: new Date().toISOString(),
      ipAddress: "192.168.1.1",
    })

    mockLogs.push({
      id: `log_specific_2`,
      adminId: "admin",
      adminName: "WRITER",
      action: "system_setting_update",
      target: "system",
      targetId: "notification_settings",
      details: "Updated system notification settings to include email alerts",
      timestamp: new Date().toISOString(),
      ipAddress: "192.168.1.1",
    })

    // Sort by timestamp descending (newest first)
    return mockLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  // Apply filters and search
  useEffect(() => {
    let filtered = [...logs]

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(term) ||
          log.target.toLowerCase().includes(term) ||
          log.targetId.toLowerCase().includes(term) ||
          log.details?.toLowerCase().includes(term) ||
          log.adminName.toLowerCase().includes(term),
      )
    }

    // Apply action filter
    if (filterAction) {
      filtered = filtered.filter((log) => log.action === filterAction)
    }

    // Apply date range filter
    if (dateRange.start) {
      filtered = filtered.filter((log) => new Date(log.timestamp) >= new Date(dateRange.start!))
    }

    if (dateRange.end) {
      filtered = filtered.filter((log) => new Date(log.timestamp) <= new Date(dateRange.end!))
    }

    // Apply sort order
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

    setFilteredLogs(filtered)
  }, [logs, searchTerm, filterAction, sortOrder, dateRange])

  const handleDownloadLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `admin_logs_${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "user_login":
        return <User className="text-blue-500" size={16} />
      case "user_logout":
        return <LogOut className="text-gray-500" size={16} />
      case "user_create":
        return <UserPlus className="text-green-500" size={16} />
      case "user_delete":
        return <Trash className="text-red-500" size={16} />
      case "user_update":
        return <Edit className="text-orange-500" size={16} />
      case "post_create":
        return <FileText className="text-green-500" size={16} />
      case "post_delete":
        return <Trash className="text-red-500" size={16} />
      case "post_update":
        return <Edit className="text-orange-500" size={16} />
      case "post_view":
        return <Eye className="text-blue-500" size={16} />
      case "comment_delete":
        return <Trash className="text-red-500" size={16} />
      case "system_setting_update":
        return <Shield className="text-purple-500" size={16} />
      case "report_review":
        return <AlertTriangle className="text-yellow-500" size={16} />
      default:
        return <Activity className="text-gray-500" size={16} />
    }
  }

  const formatActionName = (action: string) => {
    return action
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
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
      <main className="flex-grow bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-purple-700">Admin Activity Logs</h1>
                <button
                  onClick={handleDownloadLogs}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  Export Logs
                </button>
              </div>
              <p className="text-gray-600">Track and monitor all administrative actions on the platform</p>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full md:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full md:w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Filter size={16} className="mr-2 text-gray-500" />
                    Filters
                  </button>
                  <button
                    onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ArrowUpDown size={16} className="mr-2 text-gray-500" />
                    {sortOrder === "desc" ? "Newest First" : "Oldest First"}
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-3">Filter Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={filterAction || ""}
                        onChange={(e) => setFilterAction(e.target.value || null)}
                      >
                        <option value="">All Actions</option>
                        <option value="user_login">User Login</option>
                        <option value="user_logout">User Logout</option>
                        <option value="user_create">User Create</option>
                        <option value="user_delete">User Delete</option>
                        <option value="user_update">User Update</option>
                        <option value="post_create">Post Create</option>
                        <option value="post_delete">Post Delete</option>
                        <option value="post_update">Post Update</option>
                        <option value="post_view">Post View</option>
                        <option value="comment_delete">Comment Delete</option>
                        <option value="system_setting_update">System Setting Update</option>
                        <option value="report_review">Report Review</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                          value={dateRange.start || ""}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                          value={dateRange.end || ""}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setFilterAction(null)
                        setDateRange({})
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center">
                <span className="text-gray-600 text-sm">
                  Showing {filteredLogs.length} of {logs.length} logs
                </span>
                {(searchTerm || filterAction || dateRange.start || dateRange.end) && (
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setFilterAction(null)
                      setDateRange({})
                    }}
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                      <th className="py-3 px-6 text-left">Timestamp</th>
                      <th className="py-3 px-6 text-left">Admin</th>
                      <th className="py-3 px-6 text-left">Action</th>
                      <th className="py-3 px-6 text-left">Target</th>
                      <th className="py-3 px-6 text-left">Details</th>
                      <th className="py-3 px-6 text-left">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock size={14} className="text-gray-400 mr-2" />
                            <span>{new Date(log.timestamp).toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <Shield size={14} className="text-purple-500 mr-2" />
                            <span>{log.adminName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            {getActionIcon(log.action)}
                            <span className="ml-2">{formatActionName(log.action)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs">
                            {log.target}: {log.targetId}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <span className="truncate block max-w-xs">{log.details}</span>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <span className="text-gray-500">{log.ipAddress}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredLogs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No logs found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
