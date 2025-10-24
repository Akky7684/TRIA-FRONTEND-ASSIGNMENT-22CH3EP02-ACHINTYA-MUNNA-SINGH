import { Mail, Phone, MapPin, Star, Clock, MoreVertical, Video, MessageCircle, Edit, PhoneCall, Ban, History, Share2, Trash2, FileDown, QrCode, Cake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  isFavorite?: boolean;
  lastContacted?: Date;
  birthDate?: Date;
}

interface ContactCardProps {
  contact: Contact;
  onToggleFavorite: (id: string) => void;
}

export const ContactCard = ({ contact, onToggleFavorite }: ContactCardProps) => {
  const { toast } = useToast();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleMenuAction = (action: string) => {
    toast({
      title: `${action}`,
      description: `${action} for ${contact.name}`,
    });
  };

  return (
    <Card className="group relative overflow-hidden card-elevated border-border bg-card hover:border-primary/40 transition-all duration-300 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-16 w-16 ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300 shadow-md">
            {contact.avatar ? (
              <AvatarImage src={contact.avatar} alt={contact.name} />
            ) : (
              <AvatarFallback className={`bg-gradient-to-br ${getAvatarColor(contact.name)} text-white font-semibold text-lg`}>
                {getInitials(contact.name)}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors mb-2">
                  {contact.name}
                </h3>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a 
                    href={`tel:${contact.phone}`}
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onToggleFavorite(contact.id)}
                >
                  <Star
                    className={`h-5 w-5 transition-all ${
                      contact.isFavorite
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground hover:text-yellow-500"
                    }`}
                  />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleMenuAction("Edit")}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction("Call")}>
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Call
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction("Video Call")}>
                      <Video className="mr-2 h-4 w-4" />
                      Video Call
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction("Message")}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMenuAction("History")}>
                      <History className="mr-2 h-4 w-4" />
                      History
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction("Share")}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction("Share via QR")}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Share via QR
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction("Export Contact")}>
                      <FileDown className="mr-2 h-4 w-4" />
                      Export Contact
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMenuAction("Block")}>
                      <Ban className="mr-2 h-4 w-4" />
                      Block
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction("Delete")} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-4 pt-3 border-t border-border">
          <button 
            onClick={() => handleMenuAction("Call")}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group/btn"
          >
            <PhoneCall className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium text-foreground">Call</span>
          </button>
          <button 
            onClick={() => handleMenuAction("Video Call")}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group/btn"
          >
            <Video className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium text-foreground">Video</span>
          </button>
          <button 
            onClick={() => handleMenuAction("Message")}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group/btn"
          >
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium text-foreground">Message</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
            <a 
              href={`mailto:${contact.email}`}
              className="text-muted-foreground hover:text-primary transition-colors truncate"
            >
              {contact.email}
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground truncate">{contact.location}</span>
          </div>

          {contact.birthDate && (
            <div className="flex items-center gap-2 text-sm">
              <Cake className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">
                {format(contact.birthDate, "MMMM d, yyyy")}
              </span>
            </div>
          )}
          
          {contact.lastContacted && (
            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">Last contacted</p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatDistanceToNow(contact.lastContacted, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
