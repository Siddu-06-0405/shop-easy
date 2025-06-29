
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Search, 
  Filter,
  Eye,
  Edit,
  Package,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AllOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy orders data
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 79.99 },
        { name: "Phone Case", quantity: 2, price: 15.99 }
      ],
      total: 111.97,
      status: "Completed",
      date: "2024-01-15",
      shippingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      items: [
        { name: "Smart Watch", quantity: 1, price: 199.99 },
        { name: "Watch Band", quantity: 1, price: 25.99 }
      ],
      total: 225.98,
      status: "Processing",
      date: "2024-01-14",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
      paymentMethod: "PayPal"
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      items: [
        { name: "Coffee Maker", quantity: 1, price: 89.99 },
        { name: "Coffee Beans", quantity: 3, price: 12.99 }
      ],
      total: 128.96,
      status: "Shipped",
      date: "2024-01-13",
      shippingAddress: "789 Pine St, Chicago, IL 60601",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      items: [
        { name: "Yoga Mat", quantity: 1, price: 29.99 },
        { name: "Water Bottle", quantity: 1, price: 18.99 }
      ],
      total: 48.98,
      status: "Pending",
      date: "2024-01-12",
      shippingAddress: "321 Elm St, Houston, TX 77001",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-005",
      customer: "Tom Brown",
      email: "tom@example.com",
      items: [
        { name: "Bluetooth Speaker", quantity: 1, price: 89.99 },
        { name: "USB Cable", quantity: 2, price: 9.99 }
      ],
      total: 109.97,
      status: "Completed",
      date: "2024-01-11",
      shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
      paymentMethod: "Apple Pay"
    },
    {
      id: "ORD-006",
      customer: "Emily Davis",
      email: "emily@example.com",
      items: [
        { name: "Desk Lamp", quantity: 1, price: 45.99 },
        { name: "Notebook", quantity: 3, price: 8.99 }
      ],
      total: 72.96,
      status: "Cancelled",
      date: "2024-01-10",
      shippingAddress: "987 Cedar Ln, Philadelphia, PA 19101",
      paymentMethod: "Credit Card"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, order) => 
    order.status !== 'Cancelled' ? sum + order.total : sum, 0
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
            <ShoppingBag className="h-8 w-8 mr-3" />
            All Orders
          </h1>
          <p className="text-gray-600 mt-2">Track and manage all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                  <p className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'Completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and manage all customer orders</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 sm:w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="sm:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{order.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-sm text-gray-500">
                            +{order.items.length - 2} more items
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
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

export default AllOrders;
