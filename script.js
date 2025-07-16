// ===== GLOBAL VARIABLES =====
let currentPage = 1;
let isLoading = false;
let currentCategory = 'all';
let currentTheme = localStorage.getItem('theme') || 'light';
let pins = [];
let savedPins = JSON.parse(localStorage.getItem('savedPins')) || [];
let currentUser = {
    id: 'user123',
    name: 'You',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkI3QzUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYySDEweiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
    following: ['user456', 'user789'],
    followers: 1243
};

// ===== SAMPLE DATA =====
const samplePins = [
    {
        id: 1,
        title: "Minimalist Bedroom Aesthetic",
        description: "Clean lines, neutral colors, and natural light create the perfect serene bedroom space.",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGNUU2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGNUU2RDMiLz4KPHJlY3QgeD0iMTAwIiB5PSIyMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTZFNkZBIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjMwMCIgcj0iMjAiIGZpbGw9IiNGRkM0QzQiLz4KPHRleHQgeD0iMTUwIiB5PSIzNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Qzc1N0QiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiI+TWluaW1hbGlzdCBCZWRyb29tPC90ZXh0Pgo8L3N2Zz4K",
        tags: ['minimalist', 'bedroom', 'aesthetic', 'interior'],
        category: 'aesthetic',
        user: {
            id: 'user456',
            name: 'Emma Wilson',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNEREJGRkYiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYySDEweiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
            followers: 1205
        },
        likes: 324,
        saves: 156,
        sourceUrl: 'https://example.com/bedroom-inspiration'
    },
    {
        id: 2,
        title: "Boho Fashion Vibes",
        description: "Flowy fabrics, earthy tones, and bohemian accessories for the perfect free-spirited look.",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZDNEM0Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiNGRkY1RTYiLz4KPHJlY3QgeD0iMTAwIiB5PSIxNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVFNkQzIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjIwMCIgcj0iMTUiIGZpbGw9IiNDNEY0REQiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIxNSIgZmlsbD0iI0M0RjRERCIvPgo8dGV4dCB4PSIxNTAiIHk9IjI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZDNzU3RCIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE2Ij5Cb2hvIEZhc2hpb248L3RleHQ+Cjwvc3ZnPgo=",
        tags: ['boho', 'fashion', 'style', 'free-spirit'],
        category: 'fashion',
        user: {
            id: 'user789',
            name: 'Sofia Chen',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkM0QzQiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYySDEweiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
            followers: 892
        },
        likes: 256,
        saves: 89,
        sourceUrl: 'https://example.com/boho-style'
    },
    {
        id: 3,
        title: "Tropical Travel Paradise",
        description: "Crystal clear waters, palm trees, and endless summer vibes. Your next vacation destination awaits.",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjQjVEOEZGIi8+CjxyZWN0IHg9IjAiIHk9IjMwMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNDNEY0REQiLz4KPGNpcmNsZSBjeD0iMjQwIiBjeT0iNjAiIHI9IjMwIiBmaWxsPSIjRkZGNUU2Ii8+CjxwYXRoIGQ9Ik0xMDAgMzAwUTE1MCAyNTAgMjAwIDMwMCIgc3Ryb2tlPSIjRjVFNkQzIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz4KPHRleHQgeD0iMTUwIiB5PSI0MjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Qzc1N0QiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiI+VHJvcGljYWwgUGFyYWRpc2U8L3RleHQ+Cjwvc3ZnPgo=",
        tags: ['travel', 'tropical', 'paradise', 'vacation'],
        category: 'travel',
        user: {
            id: 'user101',
            name: 'Alex Rivera',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNDNEY0REQiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYySDEweiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
            followers: 2341
        },
        likes: 892,
        saves: 443,
        sourceUrl: 'https://example.com/tropical-travel'
    },
    {
        id: 4,
        title: "Self-Love Quote",
        description: "Daily reminder to practice self-compassion and embrace your journey.",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRTZFNkZBIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiNGRkM0QzQiLz4KPHRleHQgeD0iMTUwIiB5PSIxNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMyQzNFNTAiIGZvbnQtZmFtaWx5PSJMb3JhIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iNjAwIj4iQmUgS2luZCI8L3RleHQ+Cjx0ZXh0IHg9IjE1MCIgeT0iMTc4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMkMzRTUwIiBmb250LWZhbWlseT0iTG9yYSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjYwMCI+dG8gWW91cnNlbGYiPC90ZXh0Pgo8dGV4dCB4PSIxNTAiIHk9IjI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZDNzU3RCIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE2Ij5TZWxmLUxvdmUgUXVvdGU8L3RleHQ+Cjwvc3ZnPgo=",
        tags: ['quotes', 'self-love', 'motivation', 'wellness'],
        category: 'quotes',
        user: {
            id: 'user202',
            name: 'Maya Johnson',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFNkU2RkEiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYySDEweiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
            followers: 567
        },
        likes: 178,
        saves: 234,
        sourceUrl: 'https://example.com/self-love-quotes'
    },
    {
        id: 5,
        title: "Modern UI Design",
        description: "Clean interface design with perfect color harmony and typography. Modern web design inspiration.",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjM1MCIgdmlld0JveD0iMCAwIDMwMCAzNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzUwIiBmaWxsPSIjRkZGNUU2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0ZGQjdDNSIvPgo8cmVjdCB4PSIyMCIgeT0iODAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTAwIiBmaWxsPSIjQjVEOEZGIi8+CjxyZWN0IHg9IjE2MCIgeT0iODAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTAwIiBmaWxsPSIjQzRGNEREIi8+CjxyZWN0IHg9IjIwIiB5PSIyMDAiIHdpZHRoPSIyNjAiIGhlaWdodD0iMjAiIGZpbGw9IiNGNUU2RDMiLz4KPHJlY3QgeD0iMjAiIHk9IjI0MCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIyMCIgZmlsbD0iI0Y1RTZEMyIvPgo8dGV4dCB4PSIxNTAiIHk9IjMyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZDNzU3RCIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE2Ij5Nb2Rlcm4gVUkgRGVzaWduPC90ZXh0Pgo8L3N2Zz4K",
        tags: ['ui-design', 'modern', 'web-design', 'interface'],
        category: 'design',
        user: {
            id: 'user303',
            name: 'David Kim',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNCNUQ4RkYiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYySDEweiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
            followers: 1876
        },
        likes: 445,
        saves: 321,
        sourceUrl: 'https://example.com/ui-design'
    },
    {
        id: 6,
        title: "Nature's Tranquility",
        description: "Peaceful forest scene with morning mist and golden sunlight filtering through trees.",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjQzRGNEREIi8+CjxyZWN0IHg9IjAiIHk9IjMwMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGNUU2RDMiLz4KPGNpcmNsZSBjeD0iMjQwIiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjRkZGNUU2Ii8+CjxyZWN0IHg9IjUwIiB5PSIyMDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGNUU2RDMiLz4KPHJlY3QgeD0iMTUwIiB5PSIxNTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNGNUU2RDMiLz4KPHJlY3QgeD0iMjMwIiB5PSIxODAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGNUU2RDMiLz4KPHRleHQgeD0iMTUwIiB5PSIzNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Qzc1N0QiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiI+TmF0dXJlJ3MgVHJhbnF1aWxpdHk8L3RleHQ+Cjwvc3ZnPgo=",
        tags: ['nature', 'forest', 'tranquility', 'peaceful'],
        category: 'nature',
        user: {
            id: 'user404',
            name: 'Luna Rodriguez',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGNUU2RDMiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYySDEweiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
            followers: 723
        },
        likes: 289,
        saves: 167,
        sourceUrl: 'https://example.com/nature-photography'
    },
    {
        id: 7,
        title: "Gourmet Food Styling",
        description: "Beautiful food presentation with artistic plating and perfect lighting. Culinary artistry at its finest.",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGNUU2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iODAiIGZpbGw9IiNGRkM0QzQiLz4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSI1MCIgZmlsbD0iI0Y1RTZEMyIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxNTAiIHI9IjIwIiBmaWxsPSIjQzRGNEREIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAiIGZpbGw9IiNGRkM0QzQiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIxMCIgZmlsbD0iI0M0RjRERCIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMDAiIHI9IjEwIiBmaWxsPSIjQjVEOEZGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkM3NTdEIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTYiPkdvdXJtZXQgRm9vZCBTdHlsaW5nPC90ZXh0Pgo8L3N2Zz4K",
        tags: ['food', 'gourmet', 'styling', 'culinary'],
        category: 'food',
        user: {
            id: 'user505',
            name: 'Chef Marcus',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkM0QzQiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYySDEweiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
            followers: 3456
        },
        likes: 678,
        saves: 445,
        sourceUrl: 'https://example.com/gourmet-food'
    }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Load initial pins
    loadInitialPins();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize infinite scroll
    initializeInfiniteScroll();
    
    // Initialize search functionality
    initializeSearch();
});

// ===== THEME FUNCTIONS =====
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== PIN LOADING FUNCTIONS =====
function loadInitialPins() {
    pins = [...samplePins];
    renderPins(pins);
    hideLoadingSkeleton();
}

function generateMorePins() {
    const additionalPins = [];
    const baseId = pins.length;
    
    for (let i = 0; i < 10; i++) {
        const randomPin = samplePins[Math.floor(Math.random() * samplePins.length)];
        additionalPins.push({
            ...randomPin,
            id: baseId + i + 1,
            title: `${randomPin.title} - ${Math.floor(Math.random() * 100)}`,
            user: {
                ...randomPin.user,
                id: `user${baseId + i + 1}`,
                name: `User ${baseId + i + 1}`
            }
        });
    }
    
    return additionalPins;
}

function renderPins(pinsToRender) {
    const container = document.getElementById('masonry-container');
    
    pinsToRender.forEach(pin => {
        const pinElement = createPinElement(pin);
        container.appendChild(pinElement);
    });
}

function createPinElement(pin) {
    const pinCard = document.createElement('div');
    pinCard.className = 'pin-card fade-in';
    pinCard.setAttribute('data-pin-id', pin.id);
    pinCard.setAttribute('data-category', pin.category);
    
    const isSaved = savedPins.includes(pin.id);
    const saveButtonClass = isSaved ? 'saved' : '';
    
    pinCard.innerHTML = `
        <div class="pin-image-container">
            <img src="${pin.image}" alt="${pin.title}" class="pin-image">
            <div class="pin-overlay">
                <div class="pin-actions">
                    <button class="pin-action save-btn ${saveButtonClass}" onclick="toggleSavePin(${pin.id})">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="pin-action" onclick="sharePin(${pin.id})">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="pin-info">
            <h3 class="pin-title">${pin.title}</h3>
            <p class="pin-description">${pin.description}</p>
            <div class="pin-tags">
                ${pin.tags.map(tag => `<span class="pin-tag">${tag}</span>`).join('')}
            </div>
            <div class="pin-user">
                <img src="${pin.user.avatar}" alt="${pin.user.name}" class="pin-user-avatar">
                <div class="pin-user-info">
                    <h4>${pin.user.name}</h4>
                    <p>${pin.user.followers} followers</p>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to open modal
    pinCard.addEventListener('click', (e) => {
        if (!e.target.closest('.pin-actions')) {
            openPinModal(pin);
        }
    });
    
    return pinCard;
}

// ===== MODAL FUNCTIONS =====
function openPinModal(pin) {
    const modal = document.getElementById('pin-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTags = document.getElementById('modal-tags');
    const modalUser = modal.querySelector('.modal-user');
    
    modalImg.src = pin.image;
    modalTitle.textContent = pin.title;
    modalDescription.textContent = pin.description;
    modalTags.innerHTML = pin.tags.map(tag => `<span class="pin-tag">${tag}</span>`).join('');
    
    modalUser.innerHTML = `
        <img src="${pin.user.avatar}" alt="${pin.user.name}" class="user-avatar">
        <div class="user-info">
            <h4 class="username">${pin.user.name}</h4>
            <p class="user-followers">${pin.user.followers} followers</p>
        </div>
        <button class="btn btn-follow" onclick="toggleFollow('${pin.user.id}')">
            ${currentUser.following.includes(pin.user.id) ? 'Following' : 'Follow'}
        </button>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('pin-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== PIN INTERACTION FUNCTIONS =====
function toggleSavePin(pinId) {
    const button = document.querySelector(`[data-pin-id="${pinId}"] .save-btn`);
    const index = savedPins.indexOf(pinId);
    
    if (index === -1) {
        savedPins.push(pinId);
        button.classList.add('saved');
        button.innerHTML = '<i class="fas fa-bookmark"></i>';
        showNotification('Pin saved to your collection!', 'success');
    } else {
        savedPins.splice(index, 1);
        button.classList.remove('saved');
        button.innerHTML = '<i class="far fa-bookmark"></i>';
        showNotification('Pin removed from collection', 'info');
    }
    
    localStorage.setItem('savedPins', JSON.stringify(savedPins));
}

function savePin() {
    // This would be called from the modal
    showNotification('Pin saved to your collection!', 'success');
}

function sharePin(pinId) {
    const pin = pins.find(p => p.id === pinId);
    if (pin) {
        const shareUrl = `${window.location.origin}/pin/${pinId}`;
        
        if (navigator.share) {
            navigator.share({
                title: pin.title,
                text: pin.description,
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(shareUrl);
            showNotification('Link copied to clipboard!', 'success');
        }
    }
}

function copyLink() {
    const shareUrl = `${window.location.origin}/pin/current`;
    navigator.clipboard.writeText(shareUrl);
    showNotification('Link copied to clipboard!', 'success');
}

function toggleFollow(userId) {
    const button = event.target;
    const index = currentUser.following.indexOf(userId);
    
    if (index === -1) {
        currentUser.following.push(userId);
        button.textContent = 'Following';
        button.classList.add('following');
        showNotification('Now following user!', 'success');
    } else {
        currentUser.following.splice(index, 1);
        button.textContent = 'Follow';
        button.classList.remove('following');
        showNotification('Unfollowed user', 'info');
    }
}

// ===== CATEGORY FILTER FUNCTIONS =====
function initializeEventListeners() {
    // Category filter buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
            
            // Update active button
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Notification button
    document.querySelector('.notification-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        toggleNotificationDropdown();
    });
    
    // Close notification dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.notification-btn')) {
            hideNotificationDropdown();
        }
    });
    
    // Close modal when clicking outside
    document.getElementById('pin-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function filterByCategory(category) {
    currentCategory = category;
    const pinCards = document.querySelectorAll('.pin-card');
    
    pinCards.forEach(card => {
        const pinCategory = card.getAttribute('data-category');
        if (category === 'all' || pinCategory === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
}

// ===== SEARCH FUNCTIONS =====
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            searchPins(query);
        }, 300);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.toLowerCase().trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
}

function searchPins(query) {
    if (!query) {
        filterByCategory(currentCategory);
        return;
    }
    
    const pinCards = document.querySelectorAll('.pin-card');
    
    pinCards.forEach(card => {
        const pinId = card.getAttribute('data-pin-id');
        const pin = pins.find(p => p.id == pinId);
        
        if (pin) {
            const searchText = `${pin.title} ${pin.description} ${pin.tags.join(' ')}`.toLowerCase();
            if (searchText.includes(query)) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        }
    });
}

// ===== INFINITE SCROLL =====
function initializeInfiniteScroll() {
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            loadMorePins();
        }
    });
}

function loadMorePins() {
    if (isLoading) return;
    
    isLoading = true;
    showLoadingSkeleton();
    
    setTimeout(() => {
        const newPins = generateMorePins();
        pins.push(...newPins);
        renderPins(newPins);
        hideLoadingSkeleton();
        isLoading = false;
        currentPage++;
    }, 1000);
}

function showLoadingSkeleton() {
    document.getElementById('loading-skeleton').style.display = 'grid';
}

function hideLoadingSkeleton() {
    document.getElementById('loading-skeleton').style.display = 'none';
}

// ===== NOTIFICATION FUNCTIONS =====
function toggleNotificationDropdown() {
    const dropdown = document.getElementById('notification-dropdown');
    dropdown.classList.toggle('show');
}

function hideNotificationDropdown() {
    const dropdown = document.getElementById('notification-dropdown');
    dropdown.classList.remove('show');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--primary-pink);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== MOBILE RESPONSIVENESS =====
function handleResize() {
    // Adjust masonry layout on resize
    const container = document.getElementById('masonry-container');
    if (container) {
        // Force reflow
        container.style.columns = '';
        setTimeout(() => {
            container.style.columns = getComputedStyle(container).columns;
        }, 100);
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Close modal with ESC
    if (e.key === 'Escape') {
        closeModal();
        hideNotificationDropdown();
    }
    
    // Focus search with '/'
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        document.querySelector('.search-input').focus();
    }
    
    // Toggle theme with 'T'
    if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        toggleTheme();
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== ACCESSIBILITY =====
// Focus management for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Something went wrong. Please try again.', 'error');
});

// ===== EXPORT FUNCTIONS FOR OTHER PAGES =====
window.AestheticApp = {
    toggleTheme,
    showNotification,
    currentUser,
    savedPins,
    pins: () => pins
};