
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  Eye,
  Edit,
  UserCheck,
  UserX
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AllCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy customer data
  const customers = [
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      totalOrders: 12,
      totalSpent: "$1,245.67",
      status: "Active",
      joinDate: "2023-01-15",
      lastOrder: "2024-01-10"
    },
    {
      id: "CUST-002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      totalOrders: 8,
      totalSpent: "$892.45",
      status: "Active",
      joinDate: "2023-03-22",
      lastOrder: "2024-01-08"
    },
    {
      id: "CUST-003",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      totalOrders: 15,
      totalSpent: "$2,156.89",
      status: "VIP",
      joinDate: "2022-11-05",
      lastOrder: "2024-01-12"
    },
    {
      id: "CUST-004",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, TX",
      totalOrders: 3,
      totalSpent: "$234.12",
      status: "New",
      joinDate: "2024-01-01",
      lastOrder: "2024-01-05"
    },
    {
      id: "CUST-005",
      name: "Tom Brown",
      email: "tom@example.com",
      phone: "+1 (555) 567-8901",
      location: "Phoenix, AZ",
      totalOrders: 0,
      totalSpent: "$0.00",
      status: "Inactive",
      joinDate: "2023-08-18",
      lastOrder: "Never"
    },
    {
      id: "CUST-006",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 678-9012",
      location: "Philadelphia, PA",
      totalOrders: 7,
      totalSpent: "$567.33",
      status: "Active",
      joinDate: "2023-05-10",
      lastOrder: "2024-01-07"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <Link 
            to="/admin" 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Admin
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="h-8 w-8 mr-3" />
            All Customers
          </h1>
          <p className="text-gray-600 mt-2">Manage your customer base</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold">
                    {customers.filter(c => c.status === 'Active' || c.status === 'VIP').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserX className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inactive Customers</p>
                  <p className="text-2xl font-bold">
                    {customers.filter(c => c.status === 'Inactive').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">VIP Customers</p>
                  <p className="text-2xl font-bold">
                    {customers.filter(c => c.status === 'VIP').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Customer Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Customer Directory</CardTitle>
                <CardDescription>View and manage all customers</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {customer.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.totalOrders}</div>
                        <div className="text-sm text-gray-500">
                          Last: {customer.lastOrder}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllCustomers;
