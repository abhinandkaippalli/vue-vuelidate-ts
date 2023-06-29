<template>
    <div>
        <div class="flex flex-col justify-center items-center mt-8">
            <div class="login-image text-center">
                <img src="@/assets/images/logo.png" alt="logo" class="w-full h-auto">
            </div>
            <div class="login-box shadow-xl shadow-stone-300 border-2 rounded-lg border-blue-400 w-4/5 md:w-1/2 xl:w-1/2"
                style="height: auto;">
                <div class="flex justify-center mt-3">
                    <p class="text-4xl font-bold text-blue-400">Login</p>
                </div>
                <div class="login-body">
                    <div class="flex flex-col px-10 py-3 mb-5">
                        <div class="alert mt-10">
                            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-500"
                                role="alert">
                                <span class="font-medium">Incorrect email or password.</span>
                            </div>
                        </div>
                        <div class="login-form mt-6">
                            <form @submit.prevent="onLogin()">
                                <div class="email rounded border-2 border-blue-500">
                                    <input type="text" class="p-2 w-full bg-transparent" v-model="loginDetails.email"
                                        placeholder="Email Address">
                                </div>
                                <div class="error text-red-800" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}
                                </div>
                                <div class="password rounded border-2 border-blue-500 mt-12">
                                    <input type="password" class="p-2 w-full bg-transparent" v-model="loginDetails.password"
                                        placeholder="Password">
                                </div>
                                <div class="error text-red-800" v-if="v$.password.$error">{{ v$.password.$errors[0].$message
                                }}</div>
                                <div class="flex justify-end mt-10">
                                    <button type="submit"
                                        class="justify-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                        focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </div>
                                <div class="mt-6">
                                    Forgot Password?<a href="#" class="text-blue-600"> Click here</a>
                                </div>
                                <div class="mt-6">
                                    <a href="#" class="text-blue-600">Are you a Merchant? Signup Here</a>
                                </div>
                                <div class="text-sm mt-2">Contact : Support@sharedspirits.com | 650-999-0423</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import type { LoginCredentials } from '@/types/login';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

export default {
    name: 'LoginView',
    setup() {
        //vuelidity
        const loginDetails = ref<LoginCredentials>({
            email: '',
            password: '',
            error: {}
        });

        const rules = computed(() => ({
            email: {
                required: helpers.withMessage("Please enter an email address", required),
                email: helpers.withMessage("Please enter a valid email address", email),
                $autoDirty: true
            },
            password: {
                required: helpers.withMessage("Password is required", required),
                min: minLength(6),
                $autoDirty: true
            }
        })
        );

        const v$ = useVuelidate(rules, loginDetails)

        const onLogin = () => {
            v$.value.$touch()
            if (!v$.value.$error) {
                console.log('Form successfully submitted');
            } else {
                console.log(v$.value.$errors)
                console.log('Error');
            }
        }

        return { loginDetails, v$, onLogin }
    }
}
</script>