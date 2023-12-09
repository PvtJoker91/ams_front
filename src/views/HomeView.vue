<template>

    <div class="max-w-7xl bg-white text-center">
        <h1 class="mb-6 text-2xl">Welcome to AMS!</h1>
        <h3 class="mb-6 text-xl text-gray-500">Choose the operation you want to do:</h3>
    </div>


    <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
        <RouterLink to="/orders">
        <div class="main-left">
            <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                <h1 class="mb-6 text-2xl">Search and order documents</h1>
            </div>
        </div>
        </RouterLink>

        <RouterLink to="/archive">
        <div class="main-right">
            <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                <h1 class="mb-6 text-2xl">Archive tasks</h1>
            </div>
        </div>
        </RouterLink>
    </div>

</template>