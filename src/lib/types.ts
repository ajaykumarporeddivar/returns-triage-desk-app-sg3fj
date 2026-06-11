export interface ReturnRequest {
  id: string
  createdAt: string // ISO Date String
  updatedAt: string // ISO Date String
  storeId: string
  shopifyOrderId: string
  customerEmail: string
  productName: string
  productSku: string
  quantity: number
  reasonForReturn: string
  returnStatus: 'Pending Review' | 'Approved' | 'Rejected' | 'Refunded' | 'Closed' | 'Cancelled'
  resolution: 'Refund' | 'Exchange' | 'Store Credit' | 'No Resolution' | 'Pending'
  assignedTo: string | null // User ID
  priority: 'High' | 'Medium' | 'Low' | 'Urgent'
  notes: string
  productImageUrl?: string
}

export interface TriageLog {
  id: string
  createdAt: string // ISO Date String
  updatedAt: string // ISO Date String
  returnRequestId: string
  userId: string
  action: string // e.g., 'Status Changed', 'Assigned To', 'Note Added'
  details: string // e.g., 'Status changed from Pending Review to Approved'
}

export interface ActionPack {
  id: string
  createdAt: string // ISO Date String
  title: string
  description: string
  returnRequestIds: string[]
  status: 'Draft' | 'Generated' | 'Exported' | 'Archived'
  generatedBy: string // User ID
  fileUrl?: string // URL to exported file (mock)
}

export interface DemoUser {
  id: string
  name: string
  email: string
  role: string
  plan: string
  avatar: string
  joinedAt: string // ISO Date String
}

export type SortDir = 'asc' | 'desc'

export type CHART_DATA_TYPE = {
  label: string
  value: number
}[]

export type RECENT_ACTIVITY_TYPE = {
  id: string
  type: 'return_status_change' | 'return_assigned' | 'action_pack_generated' | 'note_added'
  timestamp: string // ISO Date String
  description: string
  returnRequestId?: string
}[]

export type STATS_TYPE = {
  label: string
  value: number
  change?: number
  changeType?: 'positive' | 'negative' | 'neutral'
}[]

// API Responses
export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  pagination?: {
    total: number
    page: number
    limit: number
  }
}

export type SearchParams = {
  query?: string
  status?: string | string[]
  priority?: string | string[]
  assignedTo?: string
  sortBy?: string
  sortDir?: SortDir
  page?: string
  limit?: string
}

export type GlobalFilter = {
  status: ('Pending Review' | 'Approved' | 'Rejected' | 'Refunded' | 'Closed' | 'Cancelled')[]
  priority: ('High' | 'Medium' | 'Low' | 'Urgent')[]
  assignedTo: string | null // User ID
  query: string
}