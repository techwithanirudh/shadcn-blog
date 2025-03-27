'use client';

import { useAction } from 'next-safe-action/hooks';

import type { Newsletter } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { NewsletterSchema } from '@/lib/validators';

import { TriangleAlertIcon as IconWarning, CheckCircleIcon as IconCheckCircle } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';

import { subscribeUser } from '@/app/(home)/actions';
import { LoaderIcon } from 'lucide-react';

export const NewsletterForm = () => {
    const form = useForm({
        resolver: zodResolver(NewsletterSchema),
        defaultValues: {
            email: '',
        },
    });

    const { execute, result, status } = useAction(subscribeUser);

    const onSubmit = (values: Newsletter) => {
        execute(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={status === 'executing'}
                                        placeholder="Email address"
                                        type="email"
                                        className='border-border'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {status === 'hasSucceeded' && (
                    <Alert className="bg-emerald-500/15 text-emerald-500 p-3 border-emerald-500/15">
                        <IconCheckCircle size={16} />
                        <AlertTitle className='mb-0 leading-normal'>You are now subscribed to our newsletter!</AlertTitle>
                    </Alert>
                )}
                {result.serverError && (
                    <Alert className="bg-destructive/15 text-destructive dark:bg-destructive dark:text-destructive-foreground p-3 border-destructive/15 dark:border-destructive">
                        <IconWarning className='size-4' />
                        <AlertTitle className='mb-0 leading-normal'>{result.serverError}</AlertTitle>
                    </Alert>
                )}

                <Button
                    disabled={status === 'executing'}
                    type="submit"
                    className="w-full"
                >
                    {status === 'executing' && (
                        <LoaderIcon className="mr-2 size-4 animate-spin" />
                    )}
                    Continue with Email
                </Button>
            </form>
        </Form>
    );
};