"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, MoreVertical, Phone, Video, Smile, Paperclip } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  text: string
  sender: {
    name: string
    image: string
    isCurrentUser: boolean
  }
  timestamp: string
}

interface SessionChatProps {
  sessionTitle: string
  attendeesCount: number
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hey everyone! Looking forward to the study session tomorrow.",
    sender: {
      name: "Alex Johnson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      isCurrentUser: false,
    },
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    text: "Same here! Should we focus on dynamic programming first?",
    sender: {
      name: "Sam Lee",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      isCurrentUser: false,
    },
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    text: "That sounds good. I've been struggling with that topic.",
    sender: {
      name: "You",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
      isCurrentUser: true,
    },
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    text: "I can help explain the basics. Let's start with memoization concepts.",
    sender: {
      name: "Jordan Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      isCurrentUser: false,
    },
    timestamp: "10:38 AM",
  },
  {
    id: "5",
    text: "Perfect! Also, can someone bring the textbook? Mine is at home.",
    sender: {
      name: "Emma Davis",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      isCurrentUser: false,
    },
    timestamp: "10:40 AM",
  },
  {
    id: "6",
    text: "I'll bring mine. See you all at 4 PM!",
    sender: {
      name: "You",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
      isCurrentUser: true,
    },
    timestamp: "10:42 AM",
  },
]

export function SessionChat({ sessionTitle, attendeesCount }: SessionChatProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: {
        name: "You",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
        isCurrentUser: true,
      },
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[500px] rounded-xl overflow-hidden border border-border bg-background/50 backdrop-blur-sm">
      {/* Chat Header - WhatsApp style */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">GC</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm line-clamp-1">{sessionTitle}</h3>
            <p className="text-xs text-muted-foreground">{attendeesCount} participants</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
            <Video size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
            <Phone size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
            <MoreVertical size={18} />
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {messages.map((message, index) => {
          const showAvatar = index === 0 || messages[index - 1].sender.name !== message.sender.name

          return (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.sender.isCurrentUser ? "flex-row-reverse" : ""}`}
            >
              {!message.sender.isCurrentUser && showAvatar ? (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={message.sender.image || "/placeholder.svg"} />
                  <AvatarFallback>{message.sender.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              ) : !message.sender.isCurrentUser ? (
                <div className="w-8 flex-shrink-0" />
              ) : null}

              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl ${
                  message.sender.isCurrentUser
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                }`}
              >
                {!message.sender.isCurrentUser && showAvatar && (
                  <p className="text-xs font-medium text-primary mb-1">{message.sender.name}</p>
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-[10px] mt-1 text-right ${
                    message.sender.isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - WhatsApp style */}
      <div className="px-3 py-3 bg-background/80 border-t border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <Smile size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <Paperclip size={20} />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50 rounded-full px-4"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="h-9 w-9 rounded-full flex-shrink-0"
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}
