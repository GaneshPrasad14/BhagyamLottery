import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Ticket, Trophy, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/results"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        <Trophy className="w-5 h-5 mr-3" />
                        Results
                    </Link>
                    <Link
                        to="/admin/tickets"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        <Ticket className="w-5 h-5 mr-3" />
                        Tickets
                    </Link>
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
