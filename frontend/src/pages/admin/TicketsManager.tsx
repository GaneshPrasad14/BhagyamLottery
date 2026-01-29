import { useState, useEffect } from 'react';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Trash2, Plus } from 'lucide-react';

interface Ticket {
    _id: string;
    name: string;
    code: string;
    date: string;
    type: string;
    price: string;
    firstPrize: string;
    images: string[];
}

const TicketsManager = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        date: '',
        type: 'daily',
        price: '',
        firstPrize: '',
    });
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const fetchTickets = async () => {
        try {
            const { data } = await api.get('/tickets');
            setTickets(data);
        } catch (error) {
            toast.error('Failed to fetch tickets');
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(e.target.files);
        }
    };

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, type: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('code', formData.code);
            data.append('date', formData.date);
            data.append('type', formData.type);
            data.append('price', formData.price);
            data.append('firstPrize', formData.firstPrize);
            data.append('isFeatured', 'false');

            if (selectedFiles) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    data.append('images', selectedFiles[i]);
                }
            }

            await api.post('/tickets', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Ticket added successfully');
            setFormData({
                name: '',
                code: '',
                date: '',
                type: 'daily',
                price: '',
                firstPrize: '',
            });
            setSelectedFiles(null);
            // Reset file input manually if needed using ref, simpler to just fetch
            fetchTickets();
        } catch (error) {
            toast.error('Failed to add ticket');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this ticket?')) {
            try {
                await api.delete(`/tickets/${id}`);
                toast.success('Ticket deleted');
                fetchTickets();
            } catch (error) {
                toast.error('Failed to delete ticket');
            }
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Manage Upcoming Tickets</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Ticket Name</Label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Win Win"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Code (Initials)</Label>
                            <Input
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="e.g. WW (Max 2 chars)"
                                maxLength={2}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Draw Date</Label>
                            <Input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Select onValueChange={handleSelectChange} defaultValue={formData.type}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="bumper">Bumper</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Price</Label>
                            <Input
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. ₹40"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>First Prize</Label>
                            <Input
                                name="firstPrize"
                                value={formData.firstPrize}
                                onChange={handleChange}
                                placeholder="e.g. ₹75,00,000"
                                required
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Images (Optional)</Label>
                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Button type="submit" className="w-full md:w-auto">
                                <Plus className="w-4 h-4 mr-2" /> Add Ticket
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Existing Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Prize</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket._id}>
                                    <TableCell>{ticket.date}</TableCell>
                                    <TableCell>{ticket.name}</TableCell>
                                    <TableCell className="capitalize">{ticket.type}</TableCell>
                                    <TableCell>{ticket.price}</TableCell>
                                    <TableCell>{ticket.firstPrize}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(ticket._id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {tickets.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                        No tickets found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default TicketsManager;
