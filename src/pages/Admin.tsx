import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LogOut,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Phone,
  Mail,
} from "lucide-react";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  guests: number;
  message: string | null;
  deposit_amount: number | null;
  deposit_confirmed: boolean | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/admin/auth");
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchReservations();
      
      // Set up realtime subscription
      const channel = supabase
        .channel('reservations-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'reservations',
          },
          (payload) => {
            console.log('Realtime update:', payload);
            fetchReservations();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, isAdmin]);

  const fetchReservations = async () => {
    setIsLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reservations:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les réservations.",
          variant: "destructive",
        });
      } else {
        setReservations(data || []);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Statut mis à jour",
          description: `Réservation marquée comme "${getStatusLabel(newStatus)}".`,
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'cancelled':
        return 'Annulée';
      case 'completed':
        return 'Terminée';
      default:
        return status;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30"><AlertCircle className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Confirmée</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Annulée</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30"><CheckCircle className="w-3 h-3 mr-1" />Terminée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredReservations = reservations.filter((r) =>
    statusFilter === 'all' ? true : r.status === statusFilter
  );

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    today: reservations.filter((r) => {
      const today = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return r.date.toLowerCase() === today.toLowerCase();
    }).length,
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/auth");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold">Dashboard Admin</h1>
            <p className="text-sm text-muted-foreground">Morello - Gestion des réservations</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.confirmed}</p>
                <p className="text-sm text-muted-foreground">Confirmées</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.today}</p>
                <p className="text-sm text-muted-foreground">Aujourd'hui</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirmées</SelectItem>
                <SelectItem value="cancelled">Annulées</SelectItem>
                <SelectItem value="completed">Terminées</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" onClick={fetchReservations} disabled={isLoadingData}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingData ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>

        {/* Reservations Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date & Service</TableHead>
                  <TableHead className="text-center">Convives</TableHead>
                  <TableHead>Caution</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingData ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Chargement...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredReservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Aucune réservation trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reservation.name}</p>
                          {reservation.message && (
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {reservation.message}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <a
                            href={`mailto:${reservation.email}`}
                            className="flex items-center gap-1 text-sm hover:text-accent transition-colors"
                          >
                            <Mail className="w-3 h-3" />
                            {reservation.email}
                          </a>
                          <a
                            href={`tel:${reservation.phone}`}
                            className="flex items-center gap-1 text-sm hover:text-accent transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            {reservation.phone}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reservation.date}</p>
                          <p className="text-sm text-muted-foreground">{reservation.service}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{reservation.guests}</Badge>
                      </TableCell>
                      <TableCell>
                        {reservation.deposit_amount ? (
                          <div className="space-y-1">
                            <p className="font-medium">{reservation.deposit_amount}€</p>
                            {reservation.deposit_confirmed ? (
                              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30 text-xs">
                                Confirmé
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30 text-xs">
                                À vérifier
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell>
                        <Select
                          value={reservation.status}
                          onValueChange={(value) => updateStatus(reservation.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="confirmed">Confirmée</SelectItem>
                            <SelectItem value="cancelled">Annulée</SelectItem>
                            <SelectItem value="completed">Terminée</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
