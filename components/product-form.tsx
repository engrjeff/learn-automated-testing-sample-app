'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';

import { apiClient } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';

const productSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: 'Product name is required.' })
      .max(255, { message: 'Must not be longer than 255 characters.' }),
    price: z.coerce
      .number({ message: 'Price is required.' })
      .gt(0, { message: 'Price must be greater than 0.' }),
    color: z
      .string({ required_error: 'Color is required.' })
      .nonempty({ message: 'Color is required.' }),
  })
  .strict({ message: 'Invalid field(s) provided.' });

type ProductInputs = z.infer<typeof productSchema>;

type Product = ProductInputs & { id: number };

export function ProductForm() {
  const form = useForm<ProductInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      color: '',
    },
  });

  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationKey: ['product'],
    mutationFn: async (product: ProductInputs) => {
      try {
        const response = await apiClient.post<Product>('/products', product);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data.message);
        } else {
          throw new Error('Server Error');
        }
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      form.reset();
      toast.success('Product created!');
    },
    onError() {
      toast.error('Error creating product.');
    },
  });

  const onError: SubmitErrorHandler<ProductInputs> = (error) => {
    console.log(error);
  };

  const onSubmit: SubmitHandler<ProductInputs> = async (data) => {
    await createProduct.mutateAsync(data);
  };

  return (
    <div className="w-full lg:w-[320px] shrink-0">
      <h2 className="font-semibold mb-3">Add Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <fieldset
            disabled={createProduct.isPending}
            className="space-y-4 disabled:opacity-90"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="0.00" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Colors</SelectLabel>
                        <SelectItem value="Rose Gold">Rose Gold</SelectItem>
                        <SelectItem value="Space Gray">Space Gray</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <Button type="submit" className="w-full">
                {createProduct.isPending
                  ? 'Creating product...'
                  : 'Create Product'}
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
