<template>

    
    <div class="space-y-3">
            <h2 class="text-3xl font-bold mb-4">Logistics</h2>

        <div class="max-w-7xl mx-auto grid grid-cols-3 gap-4">
            <RouterLink to="/logistics/checking">
            <div class="main-left">
                <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                    <h1 class="mb-6 text-2xl">Checking</h1>
                </div>
            </div>
            </RouterLink>

            <RouterLink to="/logistics/completion">
            <div class="main-center">
                <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                    <h1 class="mb-6 text-2xl">Completion</h1>
                </div>
            </div>
            </RouterLink>

            <RouterLink to="/logistics/placement">
            <div class="main-right">
                <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                    <h1 class="mb-6 text-2xl">Placement</h1>
                </div>
            </div>
            </RouterLink>
        </div>
    </div>



</template>
