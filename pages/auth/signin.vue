<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import SigninSchema from '../../schemas/Signin.schema';
import { z } from 'zod';

const isLoading = ref(false);
const formState = reactive({
    email: undefined,
    password: undefined,
});

const { signIn } = useAuth();

async function handleSignIn(
    event: FormSubmitEvent<z.output<typeof SigninSchema>>,
) {
    try {
        isLoading.value = true;

        const res = await signIn('credentials', {
            email: event.data.email,
            password: event.data.password,
            redirect: false,
        });
        //@ts-ignore
        if (!res.error) {
            useRouter().push('/');
        }
        console.log(res);
    } catch (err) {
        isLoading.value = false;
    }
}
</script>
<template>
    <div class="grid lg:grid-cols-2 h-screen">
        <div
            class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52"
        >
            <div class="header text-center mb-6">
                <div class="flex justify-center">
                    <Logo />
                </div>
                <div class="text-xl font-bold mt-4">Login to your account</div>
            </div>
            <UCard class="mt-4">
                <!-- Form -->
                <UForm
                    :state="formState"
                    :schema="SigninSchema"
                    @submit="handleSignIn"
                >
                    <UFormGroup class="mb-4" name="email" label="Email">
                        <UInput v-model="formState.email" type="email" />
                    </UFormGroup>
                    <UFormGroup class="mb-4" name="password" label="Password">
                        <UInput v-model="formState.password" type="password" />
                    </UFormGroup>

                    <UButton :loading="isLoading" type="submit" block
                        >Sign In</UButton
                    >
                </UForm>
                <!-- ./ Form -->
            </UCard>
        </div>
        <div class="right hidden lg:block"></div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.right {
    background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
