// import logo from '../assets/logo.svg';
import logo from '../assets/logo.png';
import slider1 from '../assets/home/sliderone.jpg'
import slider2 from '../assets/home/Slidertwo.jpg'
import slider3 from '../assets/home/Sliderthree.jpg'
import home_second from '../assets/home/home_second.png';
import homethree1 from '../assets/home/homethreeone.png'
import homethree2 from '../assets/home/homethreetwo.png'
import homethree3 from '../assets/home/homethreethree.png'
import product1 from '../assets/real7.jpg'
import product2 from '../assets/real8.jpg'
import product3 from '../assets/home/3.png'
import product4 from '../assets/home/4.png'
import product5 from '../assets/home/5.png'
import bal_suvarna_image from '../assets/home/bal_suvarna_image.png';
import balaji_image from '../assets/home/balaji_image.png';
import durga_image from '../assets/home/durga_image.png';
import ek_onkar_image from '../assets/home/ek_onkar_image.png';
import krishna_image from '../assets/home/krishna_image.png';
import saibaba_image from '../assets/home/saibaba_image.png';
import laxmi_image from '../assets/home/laxmi_image.png';
import om_ganesha_image from '../assets/home/om_ganesha_image.png';
import about9 from '../assets/home/4.png';
import about10 from '../assets/home/5.png';
import about11 from '../assets/home/Group_133224.png';
import person1 from '../assets/home/980_x_860-1.jpg';
import person2 from '../assets/home/980_x_860-5.jpg';
import person3 from '../assets/home/980_x_860-6.jpg';
import person4 from '../assets/home/980_x_860-4.jpg';
import nine1 from '../assets/home/AdobeStock_385430086-copy_2.png';
import aboutdesign from '../assets/home/about.webp';
import design from '../assets/home/thirddesign.svg';
import test1 from '../assets/home/testimonial-1.jpeg';
import test2 from '../assets/home/testimonial-2.jpeg';
import test3 from '../assets/home/testimonial-3.jpeg';
import test4 from '../assets/home/testimonial-4.jpeg';
import aboutsec from '../assets/about/about07.jpg';
import contact from '../assets/contact/contact.jpeg';



const translations = {
    home: {
        logo: logo,
        links: [
            {
                title: 'Home',
                url: '/'
            },
            {
                title: 'Shop',
                url: '/shop',
            },
            {
                title: 'About',
                url: '/about'
            },
            {
                title: 'Contact',
                url: '/contact'
            }
        ],
        header: {
            short1: "Meditation",
            title1: 'Explore Divine Artifacts',
            subtitle1: `Find handcrafted statues and spiritual products that inspire peace and positivity.`,
            short2: "Enlightenment",
            title2: 'Awaken Your Spirituality',
            subtitle2: `Transform your space with carefully crafted artifacts that embody the essence of faith and culture.`,
            short3: "Noble Truths",
            title3: 'Celebrate Spiritual Heritage',
            subtitle3: `Connect with divine artistry through our exclusive collection of spiritual products.`,
            button1: 'Shop Now',
            sider1img: slider1,
            sider2img: slider2,
            sider3img: slider3,
        },
        second: {
            short: "Special Deals",
            title: 'Get 10% Offers On Spiritual Statues',
            subtitle: `Shop now and bring home the divine presence with our exclusive discounts.`,
            button: 'Shop Now',
            image: home_second,
            design: aboutdesign,
        },
        third: {
            design: design,
            image1: homethree1,
            title1: 'Handcrafted Statues',
            subtitle1: 'Explore a variety of statues including Balaji, Durga, Krishna, and more, designed to bring spirituality into your life.',
            image2: homethree2,
            title2: 'Divine Artifacts',
            subtitle2: 'Discover premium spiritual products like Pooja Lamps and Copper Lota for daily rituals.',
            image3: homethree3,
            title3: 'Spiritual Accessories',
            subtitle3: 'Enhance your meditation with Agarbatti, OM Ganesha, and other sacred items.',
        },
        fourth: {
            short: "Our Collection",
            title: 'Exclusive Spiritual Products',
            sub: "Immerse yourself in our collection of beautifully crafted statues, artifacts, and ritual items that hold spiritual significance.",
            card: "Add Cart",
            buy: "Buy Now",
        },
        product: [
            { id: 1, category: 'Bal Suvarna', image: bal_suvarna_image },
            { id: 2, category: 'Balaji', image: balaji_image },
            { id: 3, category: 'Durga', image: durga_image },
            { id: 4, category: 'Ek Onkar', image: ek_onkar_image },
            { id: 6, category: 'Krishna', image: krishna_image },
            { id: 7, category: 'Laxmi', image: laxmi_image },
            { id: 8, category: 'Bal Suvarna', image: om_ganesha_image },
            { id: 9, category: 'Saibaba', image: saibaba_image },
        ],
        cartitle: "High Quality",
        catsub: "Special Ritual Products",
        categories: ['All', 'Bal Suvarna', 'Balaji', 'Durga', 'Ek Onkar', 'Khanda', 'Krishna', 'Laxmi', 'Saibaba'],
        faqtitle: "Expert Answers",
        faqsub: "Frequently Asked Questions",
        faqs: [
            {
                question: "What Are Your Featured Products?",
                answer: "Our featured products include handcrafted statues of Balaji, Durga, Krishna, and spiritual artifacts like Pooja Lamps.",
            },
            {
                question: "Are The Statues Handcrafted?",
                answer: "Yes, all our statues are skillfully handcrafted by artisans with attention to detail.",
            },
            {
                question: "What Are The Material Specifications?",
                answer: "Our products are made from high-quality materials ensuring durability and divine aesthetics.",
            },
            {
                question: "Can I Place A Bulk Order?",
                answer: "Yes, bulk orders are welcome. Please contact our support team for special deals and offers.",
            },
        ],
        images: about11,
        horizontal: [
            { image: person1, title: 'Krishna', link: "/product" },
            { image: person2, title: 'Gods Statue', link: "/product" },
            { image: person3, title: 'Goddess Statue', link: "/product" },
            { image: person4, title: 'Handicraft Accessories', link: "/product" },
        ],
        nine: {
            short: "Adorable Designs",
            title: "Handcrafted Spiritual Products",
            image: nine1,
        },
        reviews: [
            {
                name: "Julia",
                date: "27 July 2023",
                rating: 4,
                review: "Loved the intricate detailing on the Balaji statue. It adds a divine aura to my home.",
                image: test1,
            },
            {
                name: "James",
                date: "26 June 2023",
                rating: 5,
                review: "The Durga statue is stunning. Perfect for daily worship!",
                image: test2,
            },
            {
                name: "Martin",
                date: "29 July 2023",
                rating: 4,
                review: "Excellent craftsmanship and fast delivery. Highly recommend!",
                image: test3,
            },
            {
                name: "Stella",
                date: "15 June 2023",
                rating: 3,
                review: "Beautiful Saraswati statue but packaging could be improved.",
                image: test4,
            },
        ],
    },
    footerConfig: {
        contact: {
            logo: logo,
            sub: "  Cursus turpis massa tincidunt dui ut ornare lectus sit. Enim sit amet venenatis urna cursus eget.Netus et malesuada fames ac.",
            title: "Contact Info",
            address: "123 Street Name, City, Country",
            email: "example@email.com",
            phone: "000 123 456789"
        },
        usefulLinks: {
            title: "Useful Links",
            links: [
                { name: "Home", url: "/" },
                { name: "Store", url: "/store" },
                { name: "About", url: "/about" },
                { name: "Help", url: "/contact" },
            ]
        },
        bottomSection: {
            copyright: "All Right Reserved © {year} Designthemes",
            terms: {
                text: "Terms & Conditions",
                url: "#"
            }
        }
    },
    // about: {
    //     title: 'About',
    //     subtitle: 'HOME > ABOUT',
    //     second: {
    //         short: "About Us",
    //         title: 'Meditation is the art of finding your inner peace',
    //         subtitle: `Scelerisque fermentum dui faucibus in. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque aliquam vestibulum blandit.`,
    //         button: 'Shop Now',
    //         linkbutton: '/shop',
    //         image: aboutsec,
    //         design: aboutdesign,
    //     },
    //     short2: 'Service',
    //     title2: "What We Do Buddha",
    //     sub2: "Amet nulla facilisi morbi tempus iaculis urna id volutpat. Mattis vulputate enim nulla aliquet porttitor. Quam pellentesque nec nam aliquam sem et.",
    //     horizontal: [
    //         { image: person1, title: 'Buddha Statue', link: "/product" },
    //         { image: person2, title: 'Gods Statue', link: "/product" },
    //         { image: person3, title: 'Goddess Statue', link: "/product" },
    //         { image: person4, title: 'Goddess Statue', link: "/product" },
    //     ],
    // },
    about: {
        title: 'About',
        subtitle: 'HOME > ABOUT',
        second: {
            short: "About Us",
            title: 'Discover Spiritual Artifacts That Inspire Serenity',
            subtitle: `Our collection of divine statues and spiritual artifacts is crafted to promote peace, mindfulness, and inner harmony. We bring you premium products that resonate with cultural and spiritual values.`,
            button: 'Shop Now',
            linkbutton: '/shop',
            image: aboutsec,
            design: aboutdesign,
        },
        short2: 'Our Mission',
        title2: "Celebrating Spiritual Heritage",
        sub2: `We aim to connect people with their spiritual roots through beautifully handcrafted statues and ritual products. Our offerings reflect devotion, artistry, and timeless traditions.`,
        horizontal: [
            { image: person1, title: 'Balaji Statue', link: "/product" },
            { image: person2, title: 'Durga Statue', link: "/product" },
            { image: person3, title: 'Krishna Statue', link: "/product" },
            { image: person4, title: 'OM Ganesha Statue', link: "/product" },
        ],
    },
    contact: {
        title: 'Contact',
        subtitle: 'HOME > CONTACT',
        second: {
            short: "Contact Us",
            title: 'Get In Touch With Us',
            subtitle: `Scelerisque fermentum dui faucibus in. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque aliquam vestibulum blandit.`,
        },
        section: {
            title: "Our Branches",
            sub: "Et odio pellentesque diam volutpat. Adipiscing diam donec adipiscing tristique risus. Turpis massa sed elementum tempus egestas sed.",
            branches: [
                { title: 'New York', address: '123 Street Name, City, Country', phone: '000 123 456789' },
                { title: 'California', address: '123 Street Name, City, Country', phone: '000 123 456789' },
                { title: 'Texas', address: '123 Street Name, City, Country', phone: '000 123 456789' },
                { title: 'Florida', address: '123 Street Name, City, Country', phone: '000 123 456789' },
            ]
        },
        submit: {
            title: "Hello! Welcome to Creedy",
            sub: "Nisl pretium fusce id velit ut tortor pretium viverra. Risus quis varius quam quisque id. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Dignissim sodales ut eu sem integer vitae justo eget magna. Pulvinar etiam posuere. ",
            img: contact,
            short: "Contact Us",
            title2: "Have Question? Get in Touch!",
            button: "Get In Touch"
        }
    },
    checkout: {
        title: "Checkout",
        order: "Order Summary",
        total: "Total",
        product: "Product",
        subtotal: "Subtotal",
        shipping: "Shipping",
        successfully: "Order Placed Successfully!",
        orderNumber: "Order Number",
        thank: "Thank you for your purchase!",
        continue: "Continue Shopping",
        sectitle: "Billing Details",
        firstname: "First Name",
        lastname: "Last Name",
        country: "Country",
        address: "Street Address",
        clientaddress: "Apartment, suite, etc. (optional)",
        city: "Town / City",
        phone: "Phone",
        email: "Email",
        processing: "Processing...",
        order: "Place Order",
        mode: "Payment Mode"
    },
    // products: {
    //     categories: ['Buddha Statue', 'Agarbatti', 'Pooja Lamps', 'Copper Lota'],
    //     cat: "Category",
    //     product: [
    //         {
    //             id: 1, category: 'Sree Astha Laxmi', cost: 2999, rating: 4, isNew: false, name: 'Sree Astha Laxmi', cod: true, online: true,
    //             photo: {
    //                 image1: product1,
    //                 image2: product1,
    //             },
    //             description: ''
    //         },
    //         {
    //             id: 2, category: 'Sree Anjaneya Shani Raksha', cost: 2999, rating: 4, isNew: false, name: 'Sree Anjaneya Shani Raksha', cod: true, online: true,
    //             photo: {
    //                 image1: product2,
    //                 image2: product2,
    //                 image3: product2,
    //                 image4: product2,
    //                 image5: product2,
    //                 image6: product2,
    //                 image7: product2,
    //             },
    //             description: 'This is a beautiful sandalwood stick.',
    //             isNew: false
    //         },
    //         {
    //             id: 3, category: '', cost: 23099, rating: 4, isNew: false, name: 'Shree Laxmi, Ekdanta Ganesha, Maa Saraswati', cod: true, online: true,
    //             photo: {
    //                 image1: product3,
    //                 image2: product3,
    //                 image3: product3,
    //                 image4: product3,
    //                 image5: product3,
    //                 image6: product3,
    //                 image7: product3,
    //             },
    //             description: 'This is a beautiful sandalwood stick.',
    //             isNew: false
    //         },
    //         {
    //             id: 4, category: 'Golden Temple', cost: 31919, rating: 4, isNew: false, name: 'Golden Temple', cod: true, online: true,
    //             photo: {
    //                 image1: product4,
    //                 image2: product4,
    //                 image3: product4,
    //                 image4: product4,
    //                 image5: product4,
    //                 image6: product4,
    //                 image7: product4,
    //             },
    //             description: 'This is a beautiful sandalwood stick.',
    //             isNew: false
    //         },
    //         {
    //             id: 5, category: 'Ashtavinayaka', cost: 31919, rating: 4, isNew: false, name: 'Ashtavinayaka', cod: true, online: true,
    //             photo: {
    //                 image1: product5,
    //                 image2: product5,
    //                 image3: product5,
    //                 image4: product5,
    //                 image5: product5,
    //                 image6: product5,
    //                 image7: product5,
    //             },
    //             description: 'This is a beautiful sandalwood stick.',
    //             isNew: false
    //         },
    //     ]
    // }
    // products: {
    //     categories: ['Buddha Statue', 'Agarbatti', 'Pooja Lamps', 'Copper Lota', 'Idols', 'Temple Models'],
    //     cat: "Category",
    //     product: [
    //         {
    //             id: 1,
    //             category: 'Idols',
    //             cost: 2999,
    //             rating: 4,
    //             isNew: false,
    //             name: 'Sree Astha Laxmi',
    //             cod: true,
    //             online: true,
    //             photo: {
    //                 image1: product1,
    //                 image2: product1,
    //             },
    //             description: 'An intricately designed idol of Sree Astha Laxmi, symbolizing wealth and prosperity, perfect for home decor and pooja rituals.'
    //         },
    //         {
    //             id: 2,
    //             category: 'Idols',
    //             cost: 2999,
    //             rating: 4,
    //             isNew: false,
    //             name: 'Sree Anjaneya Shani Raksha',
    //             cod: true,
    //             online: true,
    //             photo: {
    //                 image1: product2,
    //                 image2: product2,
    //                 image3: product2,
    //                 image4: product2,
    //                 image5: product2,
    //                 image6: product2,
    //                 image7: product2,
    //             },
    //             description: 'A divine idol of Sree Anjaneya, crafted to protect against Shani doshas, bringing peace and strength to your household.'
    //         },
    //         {
    //             id: 3,
    //             category: 'Idols',
    //             cost: 23099,
    //             rating: 4,
    //             isNew: false,
    //             name: 'Shree Laxmi, Ekdanta Ganesha, Maa Saraswati',
    //             cod: true,
    //             online: true,
    //             photo: {
    //                 image1: product3,
    //                 image2: product3,
    //                 image3: product3,
    //                 image4: product3,
    //                 image5: product3,
    //                 image6: product3,
    //                 image7: product3,
    //             },
    //             description: 'A magnificent set of idols featuring Shree Laxmi, Ekdanta Ganesha, and Maa Saraswati, perfect for your pooja room and festivals.'
    //         },
    //         {
    //             id: 4,
    //             category: 'Temple Models',
    //             cost: 31919,
    //             rating: 4,
    //             isNew: false,
    //             name: 'Golden Temple',
    //             cod: true,
    //             online: true,
    //             photo: {
    //                 image1: product4,
    //                 image2: product4,
    //                 image3: product4,
    //                 image4: product4,
    //                 image5: product4,
    //                 image6: product4,
    //                 image7: product4,
    //             },
    //             description: 'A stunning model of the Golden Temple, crafted with attention to detail, ideal for gifting or as a centerpiece in your home.'
    //         },
    //         {
    //             id: 5,
    //             category: 'Idols',
    //             cost: 31919,
    //             rating: 4,
    //             isNew: false,
    //             name: 'Ashtavinayaka',
    //             cod: true,
    //             online: true,
    //             photo: {
    //                 image1: product5,
    //                 image2: product5,
    //                 image3: product5,
    //                 image4: product5,
    //                 image5: product5,
    //                 image6: product5,
    //                 image7: product5,
    //             },
    //             description: 'A sacred set of Ashtavinayaka idols, representing the eight holy forms of Lord Ganesha, a must-have for devotees.'
    //         },
    //     ]
    // }
    products: {
        categories: ['Idols'],
        cat: "Category",
        product: [
            {
                id: 1,
                category: 'Idols',
                cost: 2999,
                rating: 4,
                isNew: false,
                name: 'Sree Astha Laxmi',
                cod: true,
                online: true,
                photo: {
                    image1: product1,
                },
                description: 'An intricately designed idol of Sree Astha Laxmi, symbolizing wealth and prosperity, perfect for home decor and pooja rituals.'
            },
            {
                id: 2,
                category: 'Idols',
                cost: 2999,
                rating: 4,
                isNew: false,
                name: 'Sree Anjaneya Shani Raksha',
                cod: true,
                online: true,
                photo: {
                    image1: product2,

                },
                description: 'A divine idol of Sree Anjaneya, crafted to protect against Shani doshas, bringing peace and strength to your household.'
            },
            {
                id: 3,
                category: 'Idols',
                cost: 2696,
                rating: 5,
                isNew: true,
                name: 'Balaji Idol',
                cod: true,
                online: true,
                photo: {
                    image1: balaji_image,
                    image2: balaji_image,
                },
                description: 'An exquisite Balaji idol, embodying grace and divinity, ideal for pooja and as a spiritual gift.'
            },
            {
                id: 4,
                category: 'Idols',
                cost: 2696,
                rating: 5,
                isNew: true,
                name: 'Durga Idol',
                cod: true,
                online: true,
                photo: {
                    image1: durga_image,
                    image2: durga_image,
                },
                description: 'A beautifully crafted Durga idol symbolizing strength and protection, perfect for your sacred space.'
            },
            {
                id: 5,
                category: 'Idols',
                cost: 2696,
                rating: 5,
                isNew: true,
                name: 'Krishna Idol',
                cod: true,
                online: true,
                photo: {
                    image1: krishna_image,
                    image2: krishna_image,
                },
                description: 'A divine Krishna idol, representing love and compassion, a wonderful addition to your pooja room.'
            },
            {
                id: 6,
                category: 'Idols',
                cost: 2696,
                rating: 5,
                isNew: true,
                name: 'OM Ganesha Idol',
                cod: true,
                online: true,
                photo: {
                    image1: om_ganesha_image,
                    image2: om_ganesha_image,
                },
                description: 'An intricately designed OM Ganesha idol, symbolizing wisdom and prosperity, ideal for rituals and gifting.'
            },

            {
                id: 7,
                category: 'Idols',
                cost: 2696,
                rating: 4,
                isNew: true,
                name: 'Saibaba Idol',
                cod: true,
                online: true,
                photo: {
                    image1: saibaba_image,
                    image2: saibaba_image,
                },
                description: 'A serene Saibaba idol, radiating peace and spirituality, a perfect companion for prayer and meditation.'
            },
        ],
    }

};

export default translations;