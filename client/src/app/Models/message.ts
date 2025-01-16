export interface IMessage {
  id: number
  senderId: number
  senderUserName: string
  senderPhotoUrl: string
  recipientId: number
  recipientUserName: string
  recipientPhotoUrl: string
  dateRead?: Date
  messageSent: Date
  content: string
}
