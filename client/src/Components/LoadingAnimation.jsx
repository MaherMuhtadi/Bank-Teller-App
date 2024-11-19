function LoadingAnimation() {
    return (
        <div className="flex flex-col justify-center items-center h-full space-y-1">
            <h2 className="font-bold text-xl">Loading</h2>
            <div class="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}

export default LoadingAnimation;
