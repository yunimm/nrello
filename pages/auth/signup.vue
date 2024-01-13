<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import SignupSchema from '~/schemas/Signup.schema';
import { z } from 'zod';

const isLoading = ref(false);
const formState = reactive({
    name: undefined,
    email: undefined,
    password: undefined,
    passwordConfirm: undefined,
});

async function handleSignUp(
    event: FormSubmitEvent<z.output<typeof SignupSchema>>,
) {
    try {
        isLoading.value = true;

        await useFetch('/api/auth/signup', {
            method: 'POST',
            body: event.data,
            watch: false,
        });
        useToast().add({
            title: 'Account created!',
            description:
                'Your account has been created successfully, Redirecting you to the sign in page',
            timeout: 2000,
        });
        useRouter().push({
            name: 'auth-signin',
        });
    } catch (err: any) {
        console.log({ err });
        useToast().add({
            title: 'Error',
            description: err.message || 'Something went wrong',
        });
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <WrapperAuth title="Create a free account">
        <UForm :state="formState" :schema="SignupSchema" @submit="handleSignUp">
            <UFormGroup class="mb-4" name="name" label="Name">
                <UInput v-model="formState.name" />
            </UFormGroup>
            <UFormGroup class="mb-4" name="email" label="Email">
                <UInput v-model="formState.email" type="email" />
            </UFormGroup>
            <UFormGroup class="mb-4" name="password" label="Password">
                <UInput v-model="formState.password" type="password" />
            </UFormGroup>
            <UFormGroup
                class="mb-4"
                name="passwordConfirm"
                label="Confirm Password"
            >
                <UInput v-model="formState.passwordConfirm" type="password" />
            </UFormGroup>
            <UButton :loading="isLoading" type="submit" block
                >Create account</UButton
            >
        </UForm>
    </WrapperAuth>
</template>

<style></style>
