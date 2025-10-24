import { useState, useMemo } from "react";
import { Search, Users, Star } from "lucide-react";
import { ContactCard, Contact } from "@/components/ContactCard";
import { AddContactDialog } from "@/components/AddContactDialog";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Initial mock data
const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    isFavorite: false,
    lastContacted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    birthDate: new Date(1995, 5, 15),
  },
  {
    id: "2",
    name: "Diya Patel",
    email: "diya.patel@email.com",
    phone: "9876543211",
    location: "Ahmedabad, Gujarat",
    isFavorite: true,
    lastContacted: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: "3",
    name: "Ishaan Verma",
    email: "ishaan.v@email.com",
    phone: "+91 98123 45678",
    location: "Delhi NCR",
    isFavorite: false,
    birthDate: new Date(1998, 2, 22),
  },
  {
    id: "4",
    name: "Kavya Reddy",
    email: "kavya.reddy@email.com",
    phone: "09812345679",
    location: "Bangalore, Karnataka",
    isFavorite: false,
    lastContacted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    birthDate: new Date(1996, 8, 10),
  },
  {
    id: "5",
    name: "Rohan Gupta",
    email: "rohan.gupta@email.com",
    phone: "+91 98234 56789",
    location: "Pune, Maharashtra",
    isFavorite: true,
  },
  {
    id: "6",
    name: "Saanvi Singh",
    email: "saanvi.singh@email.com",
    phone: "9823456790",
    location: "Hyderabad, Telangana",
    isFavorite: false,
    lastContacted: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    birthDate: new Date(1997, 11, 5),
  },
];

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { toast } = useToast();

  const filteredContacts = useMemo(() => {
    let filtered = [...contacts];
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.phone.includes(query) ||
        contact.email.toLowerCase().includes(query)
      );
    }
    
    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter((contact) => contact.isFavorite);
    }
    
    // Sort alphabetically
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts, searchQuery, showFavoritesOnly]);

  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleToggleFavorite = (id: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
    
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      toast({
        title: contact.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: contact.isFavorite 
          ? `${contact.name} removed from favorites` 
          : `${contact.name} added to favorites`,
      });
    }
  };

  const favoriteCount = contacts.filter(c => c.isFavorite).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="border-b border-border backdrop-blur-xl bg-card/80 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-primary via-primary to-primary-glow rounded-xl shadow-lg glow-effect">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Contact Manager
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">
                    {contacts.length} {contacts.length === 1 ? "contact" : "contacts"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <AddContactDialog onAddContact={handleAddContact} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Search and Filters */}
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 shadow-md">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, phone, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-background border-border text-base"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Button
                  variant={showFavoritesOnly ? "default" : "outline"}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="gap-2"
                >
                  <Star className={`h-4 w-4 ${showFavoritesOnly ? "fill-current" : ""}`} />
                  Favorites {favoriteCount > 0 && `(${favoriteCount})`}
                </Button>
                
                <p className="text-sm text-muted-foreground font-medium">
                  {filteredContacts.length === 0 ? (
                    "No contacts found"
                  ) : (
                    <>
                      <span className="font-bold text-foreground">{filteredContacts.length}</span> 
                      {filteredContacts.length === 1 ? " contact" : " contacts"}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Contacts Grid */}
          {filteredContacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContacts.map((contact, index) => (
                <div
                  key={contact.id}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <ContactCard contact={contact} onToggleFavorite={handleToggleFavorite} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or add a new contact
              </p>
              <AddContactDialog onAddContact={handleAddContact} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
