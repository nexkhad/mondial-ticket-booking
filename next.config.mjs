/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['mondial-ticketing.s3.me-central-1.amazonaws.com','1000logos.net','scontent.fccj5-1.fna.fbcdn.net','www.mondial.ae','static.vecteezy.com', 'placehold.co', 'images.pexels.com', 'www.spicejet.com'],
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mondial-ticketing.s3.me-central-1.amazonaws.com'
            },
            {
                protocol: 'https',
                hostname: 'placehold.co'
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com'
            },
            {
                protocol: 'https',
                hostname: 'www.spicejet.com'
            },
            {
                protocol: 'https',
                hostname: 'www.mondial.ae'
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true
    }

};

export default nextConfig;
