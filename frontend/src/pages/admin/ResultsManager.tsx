import { useState, useEffect } from 'react';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Trash2, Plus, Download } from 'lucide-react';

interface Result {
    _id: string;
    name: string;
    date: string;
    code: string;
    firstPrize: string;
    prize: string;
    link?: string;
}

const ResultsManager = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        code: '',
        firstPrize: '',
        prize: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fetchResults = async () => {
        try {
            const { data } = await api.get('/results');
            setResults(data);
        } catch (error) {
            toast.error('Failed to fetch results');
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('date', formData.date);
            data.append('code', formData.code);
            data.append('firstPrize', formData.firstPrize);
            data.append('prize', formData.prize);

            if (selectedFile) {
                data.append('file', selectedFile);
            }

            await api.post('/results', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Result added successfully');
            setFormData({
                name: '',
                date: '',
                code: '',
                firstPrize: '',
                prize: '',
            });
            setSelectedFile(null);
            fetchResults();
        } catch (error) {
            toast.error('Failed to add result');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this result?')) {
            try {
                await api.delete(`/results/${id}`);
                toast.success('Result deleted');
                fetchResults();
            } catch (error) {
                toast.error('Failed to delete result');
            }
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Manage Results</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Result</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Lottery Name</Label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Win Win"
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
                            <Label>Code</Label>
                            <Input
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="e.g. W-123"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>First Prize details</Label>
                            <Input
                                name="firstPrize"
                                value={formData.firstPrize}
                                onChange={handleChange}
                                placeholder="e.g. WA 123456"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Prize Amount</Label>
                            <Input
                                name="prize"
                                value={formData.prize}
                                onChange={handleChange}
                                placeholder="e.g. ₹75,00,000"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Result File (PDF/Image)</Label>
                            <Input
                                type="file"
                                accept=".pdf,image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Button type="submit" className="w-full md:w-auto">
                                <Plus className="w-4 h-4 mr-2" /> Add Result
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Existing Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Prize</TableHead>
                                <TableHead>Downloads</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.map((result) => (
                                <TableRow key={result._id}>
                                    <TableCell>{result.date}</TableCell>
                                    <TableCell>{result.name}</TableCell>
                                    <TableCell>{result.code}</TableCell>
                                    <TableCell>{result.prize}</TableCell>
                                    <TableCell>
                                        {result.link ? (
                                            <a href={`http://localhost:5000${result.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                                                <Download className="w-4 h-4 mr-1" /> View
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">No file</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(result._id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {results.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                        No results found
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

export default ResultsManager;
