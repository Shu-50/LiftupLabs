import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";

interface DashboardButtonProps {
    onNavigate?: (page: string) => void;
}

export function DashboardButton({ onNavigate }: DashboardButtonProps) {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserRole();
    }, []);

    const checkUserRole = () => {
        try {
            const userStr = localStorage.getItem('liftuplabs_user');
            if (!userStr) {
                setLoading(false);
                return;
            }

            const user = JSON.parse(userStr);
            setUserRole(user.role || null);
        } catch (error) {
            console.error('Error checking user role:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDashboardClick = () => {
        // Navigate to appropriate dashboard based on role
        if (userRole === 'counsellor') {
            onNavigate?.('counsellor-dashboard');
        } else {
            onNavigate?.('user-dashboard');
        }
    };

    if (loading) {
        return null;
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleDashboardClick}
            className="border-2 border-orange-600 text-orange-700 hover:bg-orange-50"
        >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            {userRole === 'counsellor' ? 'Counsellor Dashboard' : 'My Dashboard'}
        </Button>
    );
}
