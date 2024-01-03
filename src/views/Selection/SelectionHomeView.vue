<template>

    
    <div class="space-y-3">
            <h2 class="text-3xl font-bold mb-4">Dossier Selection</h2>
            <RouterLink to="/selection/orders">
                <div class="main-right">
                    <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                        <h1 class="mb-6 text-2xl">Orders list</h1>
                    </div>
                </div>
            </RouterLink>
            
            <div class="max-w-7xl mx-auto grid grid-cols-3 gap-4">
            <RouterLink to="/selection/create">
                <div class="main-left">
                    <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                        <h1 class="mb-6 text-2xl">Create order</h1>
                    </div>
                </div>
            </RouterLink>

            <RouterLink to="/selection/execute">
                <div class="main-center">
                    <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                        <h1 class="mb-6 text-2xl">Execute order</h1>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>



</template>
