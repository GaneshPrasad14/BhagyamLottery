import { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export interface LotteryResult {
    id: string;
    name: string;
    code: string;
    drawDate: string;
    link: string;
}

interface ResultsTableProps {
    data: LotteryResult[];
}

const ResultsTable = ({ data }: ResultsTableProps) => {
    const { t } = useLanguage();
    const [entries, setEntries] = useState<string>('10');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter data based on search
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.code.toLowerCase().includes(search.toLowerCase()) ||
            item.drawDate.includes(search)
        );
    }, [data, search]);

    // Pagination logic
    const itemsPerPage = parseInt(entries);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Show</span>
                    <Select value={entries} onValueChange={(value) => { setEntries(value); setCurrentPage(1); }}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm font-medium">entries</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Search:</span>
                    <Input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        className="w-[200px]"
                    />
                </div>
            </div>

            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader className="bg-gradient-premium hover:bg-gradient-premium">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-white font-bold w-[80px]">Sl.No</TableHead>
                            <TableHead className="text-white font-bold">Lottery/DrawNo</TableHead>
                            <TableHead className="text-white font-bold">Draw Date</TableHead>
                            <TableHead className="text-white font-bold text-right">View</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((result, index) => (
                                <TableRow key={result.id} className="even:bg-accent/5 hover:bg-accent/10 transition-colors">
                                    <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                                    <TableCell className="font-medium">
                                        {result.name}-{result.drawDate} ({result.code})
                                    </TableCell>
                                    <TableCell>{result.drawDate.split('-').reverse().join('-')}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            className="bg-gradient-gold hover:opacity-90 text-primary font-semibold shadow-md active:scale-95 transition-transform"
                                        >
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                <div>
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // Logic to show current page window could be more complex, simple for now
                            let pageNum = i + 1;
                            if (totalPages > 5 && currentPage > 3) {
                                pageNum = currentPage - 2 + i;
                            }
                            if (pageNum > totalPages) return null;

                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? "default" : "outline"}
                                    size="sm"
                                    className={`w-8 h-8 p-0 ${currentPage === pageNum ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            )
                        })}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ResultsTable;
