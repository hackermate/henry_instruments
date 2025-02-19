const { Products, Categorie, Order, Trademarks, Review } = require('../../../db');

module.exports = {
    listProducts: async () => {
        const products = Products.findAll({
            include: [
                {
                    model: Categorie
                },
                {
                    model: Order
                },
                {
                    model: Trademarks
                },
            ]
        });
        return products;
    },
    product: async (id) => {
        const product = await Products.findOne(
            {
                where: { id: id },
                include: [
                    { model: Categorie },
                    { model: Trademarks },
                    { model: Review }
                ]
            }
        );
        return await product;
    },
    createProduct: async (name, image, description, price, stock, category, trademark, model) => {
        const findCategory = await Categorie.findOne({
            where: { name: category }
        });
        const findTrademark = await Trademarks.findOne({
            where: { name: trademark }
        });
        const productCreated = await Products.create({
            name: name,
            image: image,
            description: description,
            price: price,
            stock: stock,
            model
        });
        await productCreated.setCategorie(findCategory);
        await productCreated.setTrademark(findTrademark);
        return await Products.findOne(
            {
                where: { name: name },
                include: [
                    { model: Categorie },
                    { model: Trademarks }
                ]
            }
        );
    },
    updateProduct: async (obj) => {
        const findCategory = await Categorie.findOne({
            where: { name: obj.category }
        });
        const findTrademark = await Trademarks.findOne({
            where: { name: obj.trademark }
        });
        let product = await Products.findOne(
            {
                where: { id: obj.id }
            }
        );
        await product.setCategorie(findCategory);
        await product.setTrademark(findTrademark);
        product = await Products.update(
            {
                name: obj.name,
                image: obj.image,
                description: obj.description,
                price: obj.price,
                stock: obj.stock,
                model: obj.model
            },
            {
                where: {
                    id: obj.id
                }
            }
        );
        return 'Producto modificado'
    },
    deleteProduct: async (id) => {
        await Products.destroy({
            where: { id: id }
        });
        return 'Producto eliminado';
    },
    createMultipleProducts: async () => {
        const products = [
            {
                name: "Electro-Acoustic Guitars",
                image: "https://www.taylorguitars.com/sites/default/files/responsive-guitar-detail/Taylor-254ce-frl-2020_0.png",
                description: "For those guitarists looking to broaden their musical palette, this 254ce makes a strong case as the ideal 12-string for players in all situations. Layered rosewood back and sides combine with a solid Sitka spruce top to produce a vivid, octave-rich tone layered with overtonal complexity. Shimmering, cascading highs blend smoothly with a rich low end, offering a versatile tone that performs beautifully in solo settings or as an accompanying instrument played alongside a larger ensemble. The spruce top delivers top-end clarity that helps the 254ce cut through any mix, while layered back and sides make this an ideal option for travel and practice sessions. Appointed with crisp white binding, a three-ring rosette, 4mm Dot inlays, and a Venetian cutaway, this guitar ships with ES2 electronics in a hardshell gig bag.",
                price: 1099,
                stock: 10,
                category: "Electro-Acoustic Guitars",
                trademark: "Taylor",
                model: "255ce"
            },
            {
                name: "Electro-Acoustic Guitars",
                image: "https://www.taylorguitars.com/sites/default/files/responsive-guitar-detail/Taylor-214ce-DLX-RW-fr-2020.png",
                description: "With a solid Sitka spruce top and layered Indian rosewood back and sides, this Grand Auditorium guitar delivers a rich, nuanced tone profile punctuated by high-end sparkle and midrange punch. The patented Taylor neck and Venetian cutaway provide a comfortable playing experience across a broad range of musical styles, and with an Expression System 2 pickup and preamp highlighting the quality and depth of the guitar’s natural sound, the 214ce DLX is ready to perform in any environment. It’s appointed with white binding, Italian acrylic Small Diamond inlays, and a full-gloss body, and ships in a deluxe hardshell case.",
                price: 1399,
                stock: 10,
                category: "Electro-Acoustic Guitars",
                trademark: "Taylor",
                model: "214ce"
            },
            {
                name: "Electro-Acoustic Guitars",
                image: "https://www.taylorguitars.com/sites/default/files/responsive-guitar-detail/Taylor-GSMini-e-RW-frl-2019-1_0.png",
                description: "An exciting new entry in our lineup of ultra-popular short-scale guitars, this rosewood edition of the GS Mini brings the beauty and resonance of the all-star acoustic tonewood to a comfortable, easy-to-transport package. With its reduced size and slender, comfortable neck, the GS Mini offers an inviting, intimate playing experience for guitarists of all styles and levels of ability. Thanks to the GS Mini’s bold tone and projection, you’ll have everything you need for practice, jam sessions, and even live performances—it even comes with a durable structured gig bag.",
                price: 599,
                stock: 10,
                category: "Electro-Acoustic Guitars",
                trademark: "Taylor",
                model: "GS Mini Rosewood"
            },
            {
                name: "Electric Guitars",
                image: "https://static.gibson.com/product-images/USA/USAVLJ627/Sixties%20Cherry/front-banner-1600_900.png",
                description: "The Gibson ES-335 DOT is the cornerstone of the Gibson ES line-up. From its inaugural appearance in 1958, the Gibson ES-335 set an unmatched standard. The pearloid dot inlay rosewood fingerboard on a hand-rolled Rounded 'C' mahogany neck remind players where it all started. Gibson's Calibrated T-Type humbucking pickups are paired with our hand-wired control assembly. The result is that versatile Gibson ES tone that players have craved for over 60 years. Tuning stability and precise intonation are provided by the Vintage Deluxe tuners with Keystone buttons, paired with light weight Aluminum ABR-1 bridge and Stop Bar tailpiece, anchored by steel thumb-wheels and tailpiece studs.",
                price: 3299,
                stock: 10,
                category: "Electric Guitars",
                trademark: "Gibson",
                model: "ES 335"
            },
            {
                name: "Electric Guitars",
                image: "https://static.gibson.com/product-images/USA/USAUBC849/Gold%20Top/front-banner-1600_900.png",
                description: "The new Les Paul Standard returns to the classic design that made it relevant, played and loved -- shaping sound across generations and genres of music. It pays tribute to Gibson's Golden Era of innovation and brings authenticity back to life. The Les Paul Standard 50's has a solid mahogany body with a maple top, a rounded 50's-style mahogany neck with a rosewood fingerboard and trapezoid inlays. It's equipped with an ABR-1, the classic-style Tune-O-Matic bridge, aluminum stop bar tailpiece, vintage deluxe tuners with keystone buttons, and aged gold tophat knobs. The calibrated Burstbucker 1 (neck) and Burstbucker 2 (bridge) pickups are loaded with AlNiCo II magnets, audio taper potentiometers and orange drop capacitors.",
                price: 2699,
                stock: 10,
                category: "Electric Guitars",
                trademark: "Gibson",
                model: "Les Paul Standard '50s - Gold Top"
            },
            {
                name: "Electric Bass",
                image: "https://s3-us-west-2.amazonaws.com/static.music-man.com/website/images/instruments/instrument-74.png?1630695140",
                description: "First introduced in 1976, the StingRay has been revered as one of the most iconic bass guitars in history. The StingRay was the first production four string bass to feature onboard active equalization. The flagship of the Music Man line, today's StingRay retains the same signature features that it had some forty years ago, including a solid roadworthy construction, iconic oval pickguard, 3+1 tuning key configuration, and the ever-popular Music Man humbucker — all of which combine to produce a look, feel, and sound that is remarkably unmistakable.",
                price: 2699,
                stock: 10,
                category: "Electric Bass",
                trademark: "Music Man",
                model: "StyngRay"
            },
            {
                name: "Digital Keyboards",
                image: "https://usa.yamaha.com/files/PSR-EW310_thumbnail-gradient_609bb3ddbad47e9a1c411c50ba92e1ba.jpg?impolicy=resize&imwid=396&imhei=396",
                description: "PSR-EW310 is a 76-key, standard model of Portable Keyboard for those who touch keyboard instrument for the first time, or even for players for performance usage. It is loaded with versatile functions, an expressive touch-sensitive keyboard action and many convenient functions so that even beginners can enjoy playing it right away.",
                price: 599,
                stock: 10,
                category: "Digital Keyboards",
                trademark: "Yamaha",
                model: "PSR-EW310"
            },
            {
                name: "Digital Drums",
                image: "https://usa.yamaha.com/files/DTX6K-X_f_0001_657901ae9c778e17d01ef7ca7fcc0208.jpg?impolicy=resize&imwid=735&imhei=735",
                description: "The DTX6 Series features the innovative KIT MODIFIER, which sparks creativity and delivers superb performance in a compact configuration. The original Yamaha TCS (Textured Cellular Silicone) head used in the flagship models combines with real sound and ambience recorded in a world-renowned studio to provide an authentic playing experience.The DTX6 Series is recommended for all drummers who want to have fun, play like a pro and hope to easily transfer their skills to acoustic drums",
                price: 1360,
                stock: 10,
                category: "Digital Drums",
                trademark: "Yamaha",
                model: "DTX6K-X"
            },
            {
                name: "Acoustic Violin",
                image: "https://usa.yamaha.com/files/12860D429D03487A9566646B9352F275_12073_1200x480_c1a88ee3506853b29089dd1ae0815177.jpg",
                description: "The AV5-SKU Series features the innovative KIT MODIFIER, which sparks creativity and delivers superb performance in a compact configuration. The original Yamaha TCS (Textured Cellular Silicone) head used in the flagship models combines with real sound and ambience recorded in a world-renowned studio to provide an authentic playing experience.The DTX6 Series is recommended for all drummers who want to have fun, play like a pro and hope to easily transfer their skills to acoustic drums",
                price: 1095,
                stock: 10,
                category: "Acoustic Violin",
                trademark: "Yamaha",
                model: "AV5-SKU"
            },
            {
                name: "Electric Violin",
                image: "https://usa.yamaha.com/files/p_0500_007_02_1200x480_4c2b3b240a6bca6efff8424b7d05ab68.jpg",
                description: "A new kind of electric violin taking its design inspiration from the organic beauty of wood, the simplicity of clean lines, and the comfort of light weight, combined with innovative Yamaha sound to create this gorgeous live-performance instrument. (5-string model)",
                price: 2095,
                stock: 10,
                category: "Electric Violin",
                trademark: "Yamaha",
                model: "YEV-105"
            },
            {
                name: "Electric Guitars",
                image: "https://www.fmicassets.com/Damroot/LgJpg/10001/0110172834_gtr_frt_001_rr.jpg",
                description: "Beloved by country players and indie rockers alike for its semi-hollow warmth, rounder twang and elegant appearance, the Telecaster® Thinline is a classic in its own right within the venerable Telecaster lineup. The American Original '60s Telecaster Thinline recreates this sophisticated six-string with tastefully modernised playability.",
                price: 2500,
                stock: 10,
                category: "Electric Guitars",
                trademark: "Fender",
                model: "AMERICAN ORIGINAL '60S TELECASTER THINLINE"
            },
            {
                name: "Digital Keyboards",
                image: "https://www.nordkeyboards.com/sites/default/files/styles/308x160/public/files/products/nord-piano-5/NP5-overview.jpg?itok=YIIX_IAO",
                description: "The latest edition of our award-winning Piano series is equipped with dual piano engines, dual sample synths and twice the memory of the previous generation. With the combination of a premium Triple Sensor keybed and our exclusive Virtual Hammer Action Technology, the portable Nord Piano 5 delivers an exceptional playing experience.",
                price: 1500,
                stock: 10,
                category: "Digital Keyboards",
                trademark: "Nord",
                model: "Piano 5"
            },
            {
                name: "Digital Drums",
                image: "https://www.nordkeyboards.com/sites/default/files/files/products/nord-drum-3p/images/Nord%20Drum%203P%20Top.jpg",
                description: "The super compact new Nord Drum 3P combines stunning playability with unlimited sound design possibilities! New features include integrated multi-pad, Reverb and Delay effects, a simplified sound selection mode and new Sound Banks for quickly creating custom kits on the fly.",
                price: 900,
                stock: 10,
                category: "Digital Drums",
                trademark: "Nord",
                model: "Drum 3p"
            },
            {
                name: "Electric Guitars",
                image: "https://www.taylorguitars.com/sites/default/files/styles/multi_column_guitar_light/public/Taylor-T5-Classic-fr-2015.png?itok=3sQQWULV",
                description: "Mahogany-top guitars aren’t exclusive to Taylor’s acoustic line. The character-rich hog-top T5 Classic shows off a dark, earthy look that’s underscored by a satin classic mahogany finish and an unbound body. The hollowbody hybrid’s three-pickup configuration features an acoustic body sensor, a concealed neck humbucker, and a visible bridge humbucker, plus five-way switching and onboard tone controls that give players a truly full-range performance guitar. Additional appointments include Small Diamond inlays and nickel hardware. The guitar ships in a Taylor gig bag.",
                price: 1899,
                stock: 10,
                category: "Electric Guitars",
                trademark: "Taylor",
                model: "T5 Classic"
            },
            {
                name: "Digital Keyboards",
                image: "https://www.nordkeyboards.com/sites/default/files/files/products/nord-lead-a1/images/models-leada1.jpg",
                description: "This is the new Nord Lead A1 analog modeling synthesizer - a stunning sounding synthesizer with a simplified yet hugely powerful front panel interface. Producing stand-out sounds for live or for the studio, the Lead A1 is ideal for all musical genres. Thanks to its carefully thought-out user interface, the Lead A1 encourages experimentation, allows for far speedier programming than would otherwise be possible, and ultimately delivers sensational sonic results.",
                price: 1800,
                stock: 10,
                category: "Digital Keyboards",
                trademark: "Nord",
                model: "Lead A1"
            },
        ];
        await Products.bulkCreate(products);
        return "Productos creados";
    },
}