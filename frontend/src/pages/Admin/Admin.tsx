import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import API from "@/utils/api";

const Admin = () => {
  const [users, setUsers] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/auth/total-users");
      setUsers(res.data.totalUsers);

      const res2 = await API.get("/products/total-products");
      setProductsCount(res2.data.totalProducts);

      const res3 = await API.get("/orders/o/total-orders");
      setOrdersCount(res3.data.totalOrders);

      const res4 = await API.get("/orders/o/total-revenue");
      setRevenue(res4.data.totalRevenue);

      const res5 = await API.get("/orders/o/recent-orders");
      setRecentOrders(res5.data);

      const productRes = await API.get("/products");
      setProducts(productRes.data);
      // console.log(productRes.data);
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: revenue,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Orders",
      value: ordersCount,
      change: "+8.2%",
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      title: "Customers",
      value: users,
      change: "+15.3%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Products",
      value: productsCount,
      change: "+2.1%",
      icon: Package,
      color: "text-orange-600",
    },
  ];

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const getStatusColor = (inStock: boolean | undefined) => {
    if (inStock === true) return "text-green-600 bg-green-100";
    if (inStock === false) return "text-red-600 bg-red-100";
    return "text-gray-600 bg-gray-100"; // fallback for undefined/null
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your e-commerce store</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id.slice(-8).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-gray-500">
                            {order.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.total}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Products Management */}
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your product inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-sm text-gray-500">
                            {product.category}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${product.price}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <span
                          className={`whitespace-nowrap px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            product.inStock
                          )}`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Link to={`/admin/edit-product/${product._id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product._id)}
                          >
                            <Trash2 className="h-4 w-4" />
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

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/add-product">
                <Button className="h-16 flex flex-col items-center justify-center w-full ">
                  <Package className="h-5 w-5 mb-1" />
                  Add New Product
                </Button>
              </Link>
              <Link to="/admin/customers">
                <Button
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center w-full"
                >
                  <Users className="h-5 w-5 mb-1" />
                  View All Customers
                </Button>
              </Link>
              <Link to="/admin/orders">
                <Button
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center w-full"
                >
                  <ShoppingBag className="h-5 w-5 mb-1" />
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
