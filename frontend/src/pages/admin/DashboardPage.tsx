import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardPage = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">--</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">--</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
