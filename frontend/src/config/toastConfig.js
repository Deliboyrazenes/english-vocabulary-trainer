export const toastConfig = {
    position: "top-right",
    toastOptions: {
        duration: 4000,
        className: "",
        style: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            fontWeight: "600",
            padding: "16px 24px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            fontSize: "15px",
        },
        success: {
            style: {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "2px solid rgba(34, 197, 94, 0.5)",
            },
            iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
            },
        },
        error: {
            style: {
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                border: "2px solid rgba(239, 68, 68, 0.5)",
            },
            iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
            },
        },
        loading: {
            style: {
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                border: "2px solid rgba(59, 130, 246, 0.5)",
            },
            iconTheme: {
                primary: "#3b82f6",
                secondary: "#fff",
            },
        },
    },
};
