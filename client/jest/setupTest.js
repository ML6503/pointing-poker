process.env = {
    ...process.env,
    __NEXT_IMAGE_OPTS: {
        deviceSizes: [320, 420, 768, 1024, 1200],   
        iconSizes: [16, 32, 48],
        imageSizes: [],
        // imageSizes: [200, 200],
        // domains: ['images.example.com'],
        path: '/_next/image',
        loader: 'default',
    },
  };
  