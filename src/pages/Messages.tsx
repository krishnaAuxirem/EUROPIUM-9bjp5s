import { useState, useRef, useEffect } from "react";
import {
  Send, Search, MoreVertical, ArrowLeft, Phone, Video,
  Paperclip, Smile, CheckCheck, Check, MapPin, Briefcase
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { Conversation, Message } from "@/types";

const CONVERSATIONS: Conversation[] = [
  {
    id: "c1", participantName: "Hans Weber", participantInitials: "HW",
    participantRole: "Landlord · Berlin", lastMessage: "The apartment is available from October 1st.",
    lastTime: "2 min", unread: 2, context: "Housing",
  },
  {
    id: "c2", participantName: "Philips Design HR", participantInitials: "PD",
    participantRole: "Employer · Amsterdam", lastMessage: "Thank you for your application! We'd like to schedule...",
    lastTime: "1h", unread: 1, context: "Job Application",
  },
  {
    id: "c3", participantName: "ASML Recruitment", participantInitials: "AS",
    participantRole: "Employer · Eindhoven", lastMessage: "Your profile looks great. Can we schedule a call?",
    lastTime: "3h", unread: 0, context: "Job Application",
  },
  {
    id: "c4", participantName: "Sophie Laurent", participantInitials: "SL",
    participantRole: "Community · Paris", lastMessage: "Join us for the expat meetup next Saturday!",
    lastTime: "1d", unread: 0, context: "Community",
  },
  {
    id: "c5", participantName: "Nordic Cleantech", participantInitials: "NC",
    participantRole: "Business Partner · Stockholm", lastMessage: "We're interested in exploring a partnership.",
    lastTime: "2d", unread: 0, context: "Business",
  },
  {
    id: "c6", participantName: "João Costa", participantInitials: "JC",
    participantRole: "Landlord · Lisbon", lastMessage: "The property has been rented. Sorry!",
    lastTime: "3d", unread: 0, context: "Housing",
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  c1: [
    { id: "m1", senderId: "hw", senderName: "Hans Weber", content: "Hello! I saw you're interested in the Prenzlauer Berg apartment.", timestamp: "10:02", read: true },
    { id: "m2", senderId: "me", senderName: "Me", content: "Hi Hans! Yes, I'm very interested. Is it still available for November?", timestamp: "10:05", read: true },
    { id: "m3", senderId: "hw", senderName: "Hans Weber", content: "Yes! The apartment is available from October 1st. The previous tenant is leaving on the 30th.", timestamp: "10:08", read: true },
    { id: "m4", senderId: "me", senderName: "Me", content: "That works perfectly for me. Can we schedule a viewing?", timestamp: "10:10", read: true },
    { id: "m5", senderId: "hw", senderName: "Hans Weber", content: "The apartment is available from October 1st.", timestamp: "10:12", read: false },
  ],
  c2: [
    { id: "m1", senderId: "pd", senderName: "Philips Design HR", content: "Hi! We received your application for the UX/UI Designer position. Impressive portfolio!", timestamp: "Yesterday 14:30", read: true },
    { id: "m2", senderId: "me", senderName: "Me", content: "Thank you! I'm very excited about the opportunity to work at Philips. The healthcare design challenge is exactly what I've been working on.", timestamp: "Yesterday 15:00", read: true },
    { id: "m3", senderId: "pd", senderName: "Philips Design HR", content: "Thank you for your application! We'd like to schedule a first round interview. Are you available next week?", timestamp: "Today 09:15", read: false },
  ],
  c3: [
    { id: "m1", senderId: "as", senderName: "ASML Recruitment", content: "Hello! We came across your profile on EUROPIUM and think you could be a great fit for our Frontend Developer role.", timestamp: "Today 11:00", read: true },
    { id: "m2", senderId: "as", senderName: "ASML Recruitment", content: "Your profile looks great. Can we schedule a call?", timestamp: "Today 11:02", read: true },
  ],
  c4: [
    { id: "m1", senderId: "sl", senderName: "Sophie Laurent", content: "Hey! Are you part of the Paris expats community?", timestamp: "Yesterday", read: true },
    { id: "m2", senderId: "me", senderName: "Me", content: "Yes, just joined! Berlin actually, but I travel to Paris often.", timestamp: "Yesterday", read: true },
    { id: "m3", senderId: "sl", senderName: "Sophie Laurent", content: "Join us for the expat meetup next Saturday!", timestamp: "Yesterday", read: true },
  ],
  c5: [
    { id: "m1", senderId: "nc", senderName: "Nordic Cleantech", content: "Hi! We're Nordic Cleantech Suppliers, based in Stockholm. We're interested in exploring a partnership.", timestamp: "2 days ago", read: true },
  ],
};

const contextColors: Record<string, string> = {
  "Housing": "bg-emerald-100 text-emerald-700",
  "Job Application": "bg-royalblue-100 text-royalblue-700",
  "Community": "bg-gold-100 text-gold-700",
  "Business": "bg-purple-100 text-purple-700",
};

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedConv, setSelectedConv] = useState<string>("c1");
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showConvList, setShowConvList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conv = CONVERSATIONS.find(c => c.id === selectedConv);
  const currentMessages = messages[selectedConv] ?? [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConv, messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: user?.name ?? "Me",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };
    setMessages(prev => ({
      ...prev,
      [selectedConv]: [...(prev[selectedConv] ?? []), newMsg],
    }));
    setInput("");

    // Auto-reply simulation
    setTimeout(() => {
      const replies: Record<string, string> = {
        c1: "Thanks for your message! I'll get back to you shortly.",
        c2: "We'll follow up with the interview schedule by tomorrow.",
        c3: "I'll send over a calendar invite for a 30-minute discovery call.",
        c4: "See you at the meetup! 🎉",
        c5: "Let's set up a call to discuss the partnership opportunity.",
      };
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedConv,
        senderName: CONVERSATIONS.find(c => c.id === selectedConv)?.participantName ?? "Them",
        content: replies[selectedConv] ?? "Thank you for your message!",
        timestamp: new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      setMessages(prev => ({
        ...prev,
        [selectedConv]: [...(prev[selectedConv] ?? []), reply],
      }));
    }, 1200);
  };

  const filteredConvs = CONVERSATIONS.filter(c =>
    c.participantName.toLowerCase().includes(search.toLowerCase()) ||
    c.context.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = CONVERSATIONS.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="page-container bg-gray-50">
      {/* Header */}
      <section className="bg-navy-900 py-6 border-b border-navy-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl font-bold text-white">Messages</h1>
              <p className="text-white/50 text-sm mt-0.5">
                {totalUnread > 0 ? `${totalUnread} unread messages` : "All messages read"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden" style={{ height: "calc(100vh - 220px)", minHeight: "600px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] h-full">

            {/* Conversation List */}
            <div className={`border-r border-border flex flex-col ${!showConvList && "hidden lg:flex"}`}>
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="input-premium pl-9 text-sm w-full"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredConvs.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => { setSelectedConv(conv.id); setShowConvList(false); }}
                    className={`w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left ${
                      selectedConv === conv.id ? "bg-royalblue-50 border-l-2 border-l-royalblue-500" : ""
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-sm">
                        {conv.participantInitials}
                      </div>
                      {conv.unread > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-sm truncate ${conv.unread > 0 ? "font-bold text-navy-900" : "font-semibold text-gray-800"}`}>
                          {conv.participantName}
                        </p>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{conv.lastTime}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{conv.participantRole}</p>
                      <p className={`text-xs truncate ${conv.unread > 0 ? "text-navy-700 font-medium" : "text-gray-400"}`}>
                        {conv.lastMessage}
                      </p>
                      <span className={`tag text-xs mt-1 ${contextColors[conv.context] ?? "bg-gray-100 text-gray-600"}`}>
                        {conv.context}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            {conv && (
              <div className={`flex flex-col h-full ${showConvList && "hidden lg:flex"}`}>
                {/* Chat Header */}
                <div className="flex items-center justify-between gap-3 p-4 border-b border-border bg-white">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowConvList(true)} className="lg:hidden p-1 hover:bg-gray-100 rounded-lg">
                      <ArrowLeft size={18} />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {conv.participantInitials}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">{conv.participantName}</p>
                      <p className="text-xs text-gray-400">{conv.participantRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`tag text-xs ${contextColors[conv.context] ?? ""}`}>{conv.context}</span>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {currentMessages.map(msg => {
                    const isMe = msg.senderId === "me";
                    return (
                      <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        {!isMe && (
                          <div className="w-7 h-7 rounded-full bg-navy-800 flex items-center justify-center text-white text-xs font-bold mr-2 self-end shrink-0">
                            {conv.participantInitials[0]}
                          </div>
                        )}
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                          isMe ? "bg-navy-900 text-white rounded-br-sm" : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                          <div className={`flex items-center gap-1 mt-1 ${isMe ? "justify-end" : ""}`}>
                            <span className={`text-xs ${isMe ? "text-white/50" : "text-gray-400"}`}>{msg.timestamp}</span>
                            {isMe && (
                              msg.read
                                ? <CheckCheck size={12} className="text-royalblue-300" />
                                : <Check size={12} className="text-white/40" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-white">
                  <div className="flex items-end gap-3">
                    <div className="flex-1 relative">
                      <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                        placeholder="Type a message... (Enter to send)"
                        rows={1}
                        className="input-premium resize-none w-full text-sm min-h-[44px] max-h-[100px] pr-10"
                      />
                      <button className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600">
                        <Smile size={16} />
                      </button>
                    </div>
                    <button className="p-2.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-xl">
                      <Paperclip size={16} />
                    </button>
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim()}
                      className="w-11 h-11 rounded-xl bg-navy-900 hover:bg-navy-800 text-white flex items-center justify-center transition-all disabled:opacity-40 shrink-0"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
