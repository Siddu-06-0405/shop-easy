import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '@/utils/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: '',
        category: '',
        price: '',
        quantity: 0,
        inStock: true,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/products/${id}`);
                setProduct({
                    title: res.data.title,
                    category: res.data.category,
                    price: res.data.price,
                    quantity: res.data.quantity,
                    inStock: res.data.inStock,
                });
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(product);
        // return

        try {
            await API.put(`/products/${id}`, product);
            navigate('/admin');
        } catch (err) {
            console.error('Failed to update product:', err);
        }
    };

    if (loading) {
        return <div className="p-6">Loading product...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 max-w-3xl mx-auto">
            <br />
            <br />
            <Card>
                <CardHeader>
                    <CardTitle>Edit Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-1 font-medium">Product Name</label>
                            <Input name="title" value={product.title} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Category</label>
                            <Input name="category" value={product.category} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Price</label>
                            <Input type="number" name="price" value={product.price} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Stock</label>
                            <Input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Status</label>
                            <select
                                name="inStock"
                                value={product.inStock ? "true" : "false"}
                                onChange={(e) =>
                                    setProduct((prev) => ({ ...prev, inStock: e.target.value === "true" }))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="true">Active</option>
                                <option value="false">Out of Stock</option>
                            </select>
                        </div>


                        <Button type="submit" className="w-full">Update Product</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProduct;
