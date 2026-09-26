import { Product, Category, School, AcademicYear, SchoolClass, SchoolRequirement, SchoolPackage, Order, Customer, Review, DeliveryZone } from '../types';

// ============ CATEGORIES ============
export const categories: Category[] = [
  { id: 'cat-1', name: 'School Textbooks', slug: 'textbooks', icon: '📚', description: 'Textbooks for all levels', productCount: 120 },
  { id: 'cat-2', name: 'Stationery', slug: 'stationery', icon: '✏️', description: 'Pens, pencils, notebooks & more', productCount: 85 },
  { id: 'cat-3', name: 'School Bags', slug: 'school-bags', icon: '🎒', description: 'Durable school bags for all ages', productCount: 45 },
  { id: 'cat-4', name: 'Mathematical Sets', slug: 'mathematical-sets', icon: '🧮', description: 'Geometry and math sets', productCount: 20 },
  { id: 'cat-5', name: 'Art & Craft Supplies', slug: 'art-supplies', icon: '🎨', description: 'Art materials and craft supplies', productCount: 35 },
  { id: 'cat-6', name: 'Educational Toys', slug: 'educational-toys', icon: '🧸', description: 'Learning toys for children', productCount: 30 },
  { id: 'cat-7', name: 'Kids Story Books', slug: 'story-books', icon: '📖', description: 'Story books for young readers', productCount: 60 },
  { id: 'cat-8', name: 'Office Supplies', slug: 'office-supplies', icon: '💼', description: 'Office and business supplies', productCount: 50 },
  { id: 'cat-9', name: 'New Syllabus Books', slug: 'new-syllabus', icon: '📗', description: 'Latest curriculum textbooks', productCount: 40 },
  { id: 'cat-10', name: 'Cambridge Books', slug: 'cambridge-books', icon: '📘', description: 'Cambridge curriculum books', productCount: 25 },
  { id: 'cat-11', name: 'Exam Preparation', slug: 'exam-prep', icon: '📝', description: 'Past questions and exam guides', productCount: 35 },
  { id: 'cat-12', name: 'General Books', slug: 'general-books', icon: '📕', description: 'Fiction, non-fiction & reference', productCount: 70 },
];

// ============ PRODUCTS ============
export const products: Product[] = [
  { id: 'p1', sku: 'TXT-MATH-SHS1-001', isbn: '978-9988-123-45-6', name: 'Core Mathematics for SHS 1', slug: 'core-mathematics-shs-1', description: 'Comprehensive mathematics textbook for SHS 1 students covering algebra, geometry, statistics and trigonometry. Aligned with the new GES syllabus.', shortDescription: 'SHS 1 Mathematics textbook - New syllabus', categoryId: 'cat-1', author: 'Prof. Kwame Asante', publisher: 'EducPress Ghana', price: 55.00, salePrice: 48.00, stockQuantity: 120, lowStockThreshold: 10, images: ['📐'], status: 'active', featured: true, bestSeller: true, newArrival: false, rating: 4.5, reviewCount: 32, createdAt: '2025-06-01', updatedAt: '2025-12-01' },
  { id: 'p2', sku: 'TXT-ENG-SHS1-001', isbn: '978-9988-123-46-3', name: 'English Language for SHS 1', slug: 'english-language-shs-1', description: 'Complete English language textbook for SHS 1 with comprehension, grammar, essay writing and literature sections.', shortDescription: 'SHS 1 English textbook', categoryId: 'cat-1', author: 'Mrs. Abena Osei', publisher: 'LearnAfrica Publishers', price: 50.00, stockQuantity: 95, lowStockThreshold: 10, images: ['📖'], status: 'active', featured: true, bestSeller: true, newArrival: false, rating: 4.3, reviewCount: 28, createdAt: '2025-06-01', updatedAt: '2025-12-01' },
  { id: 'p3', sku: 'TXT-SCI-SHS1-001', isbn: '978-9988-123-47-0', name: 'Integrated Science for SHS 1', slug: 'integrated-science-shs-1', description: 'Integrated science textbook covering biology, chemistry and physics fundamentals for SHS 1.', shortDescription: 'SHS 1 Integrated Science textbook', categoryId: 'cat-1', author: 'Dr. Yaw Mensah', publisher: 'EducPress Ghana', price: 58.00, salePrice: 52.00, stockQuantity: 80, lowStockThreshold: 10, images: ['🔬'], status: 'active', featured: true, bestSeller: true, newArrival: false, rating: 4.6, reviewCount: 45, createdAt: '2025-06-01', updatedAt: '2025-12-01' },
  { id: 'p4', sku: 'TXT-SOC-SHS1-001', isbn: '978-9988-123-48-7', name: 'Social Studies for SHS 1', slug: 'social-studies-shs-1', description: 'Social studies textbook for SHS 1 covering governance, culture, economics and environmental studies.', shortDescription: 'SHS 1 Social Studies textbook', categoryId: 'cat-1', author: 'Mr. Kofi Boateng', publisher: 'GhanaText Publishers', price: 45.00, stockQuantity: 110, lowStockThreshold: 10, images: ['🌍'], status: 'active', featured: true, bestSeller: false, newArrival: false, rating: 4.2, reviewCount: 19, createdAt: '2025-06-01', updatedAt: '2025-12-01' },
  { id: 'p5', sku: 'TXT-MATH-JHS2-001', isbn: '978-9988-123-49-4', name: 'Mathematics for JHS 2', slug: 'mathematics-jhs-2', description: 'JHS 2 mathematics textbook with exercises, worked examples and practice questions.', shortDescription: 'JHS 2 Mathematics textbook', categoryId: 'cat-1', author: 'Prof. Kwame Asante', publisher: 'EducPress Ghana', price: 40.00, stockQuantity: 150, lowStockThreshold: 15, images: ['📐'], status: 'active', featured: false, bestSeller: true, newArrival: false, rating: 4.4, reviewCount: 38, createdAt: '2025-05-01', updatedAt: '2025-11-01' },
  { id: 'p6', sku: 'TXT-ENG-JHS1-001', isbn: '978-9988-123-50-0', name: 'English for JHS 1', slug: 'english-jhs-1', description: 'English language textbook for JHS 1 students.', shortDescription: 'JHS 1 English textbook', categoryId: 'cat-1', author: 'Mrs. Abena Osei', publisher: 'LearnAfrica Publishers', price: 38.00, stockQuantity: 130, lowStockThreshold: 15, images: ['📖'], status: 'active', featured: false, bestSeller: false, newArrival: true, rating: 4.1, reviewCount: 15, createdAt: '2025-11-01', updatedAt: '2025-12-01' },
  { id: 'p7', sku: 'STN-EXBOOK-A5-001', name: 'Exercise Book A5 (Pack of 10)', slug: 'exercise-book-a5-pack-10', description: 'High quality A5 exercise books. Pack of 10. 96 pages each. Suitable for all subjects.', shortDescription: 'A5 exercise books - pack of 10', categoryId: 'cat-2', price: 25.00, salePrice: 20.00, stockQuantity: 500, lowStockThreshold: 50, images: ['📓'], status: 'active', featured: true, bestSeller: true, newArrival: false, rating: 4.7, reviewCount: 89, createdAt: '2025-01-01', updatedAt: '2025-12-01' },
  { id: 'p8', sku: 'STN-PEN-BLUE-001', name: 'Ballpoint Pen Blue (Pack of 12)', slug: 'ballpoint-pen-blue-pack-12', description: 'Smooth writing blue ballpoint pens. Pack of 12. Comfortable grip.', shortDescription: 'Blue ballpoint pens - pack of 12', categoryId: 'cat-2', price: 15.00, stockQuantity: 300, lowStockThreshold: 30, images: ['🖊️'], status: 'active', featured: false, bestSeller: true, newArrival: false, rating: 4.5, reviewCount: 67, createdAt: '2025-01-01', updatedAt: '2025-12-01' },
  { id: 'p9', sku: 'STN-PENCIL-HB-001', name: 'HB Pencils (Pack of 12)', slug: 'hb-pencils-pack-12', description: 'Quality HB pencils with erasers. Pack of 12.', shortDescription: 'HB pencils - pack of 12', categoryId: 'cat-2', price: 12.00, stockQuantity: 250, lowStockThreshold: 25, images: ['✏️'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.3, reviewCount: 42, createdAt: '2025-01-01', updatedAt: '2025-12-01' },
  { id: 'p10', sku: 'STN-MATHSET-001', name: 'Mathematical Set (Complete)', slug: 'mathematical-set-complete', description: 'Complete mathematical set with compass, protractor, ruler, set squares and divider. In protective case.', shortDescription: 'Complete mathematical set with case', categoryId: 'cat-4', brand: 'GeoMaster', price: 35.00, salePrice: 28.00, stockQuantity: 200, lowStockThreshold: 20, images: ['🧮'], status: 'active', featured: true, bestSeller: true, newArrival: false, rating: 4.6, reviewCount: 55, createdAt: '2025-03-01', updatedAt: '2025-12-01' },
  { id: 'p11', sku: 'BAG-PRIMARY-001', name: 'Primary School Backpack - Blue', slug: 'primary-school-backpack-blue', description: 'Durable and lightweight backpack for primary school students. Multiple compartments, water-resistant material.', shortDescription: 'Primary school backpack - water resistant', categoryId: 'cat-3', brand: 'SchoolGear', price: 85.00, salePrice: 70.00, stockQuantity: 60, lowStockThreshold: 10, images: ['🎒'], status: 'active', featured: true, bestSeller: false, newArrival: true, rating: 4.4, reviewCount: 23, createdAt: '2025-10-01', updatedAt: '2025-12-01' },
  { id: 'p12', sku: 'BAG-SHS-BLACK-001', name: 'SHS/JHS Backpack - Black', slug: 'shs-jhs-backpack-black', description: 'Large capacity backpack suitable for JHS and SHS students. Laptop compartment included.', shortDescription: 'Large backpack for JHS/SHS students', categoryId: 'cat-3', brand: 'SchoolGear', price: 120.00, stockQuantity: 45, lowStockThreshold: 8, images: ['🎒'], status: 'active', featured: false, bestSeller: false, newArrival: true, rating: 4.5, reviewCount: 18, createdAt: '2025-11-01', updatedAt: '2025-12-01' },
  { id: 'p13', sku: 'ART-CRAYON-001', name: 'Crayons Set (24 Colors)', slug: 'crayons-set-24-colors', description: 'Vibrant crayons set with 24 colors. Non-toxic and safe for children.', shortDescription: '24-color crayon set - non-toxic', categoryId: 'cat-5', brand: 'ArtKids', price: 18.00, stockQuantity: 180, lowStockThreshold: 20, images: ['🖍️'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.8, reviewCount: 34, createdAt: '2025-04-01', updatedAt: '2025-12-01' },
  { id: 'p14', sku: 'ART-WCOLOR-001', name: 'Watercolor Paint Set (12 Colors)', slug: 'watercolor-paint-set-12', description: 'Professional watercolor paint set with 12 colors, brush and palette.', shortDescription: '12-color watercolor set with brush', categoryId: 'cat-5', brand: 'ArtKids', price: 30.00, salePrice: 25.00, stockQuantity: 90, lowStockThreshold: 10, images: ['🎨'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.6, reviewCount: 21, createdAt: '2025-04-01', updatedAt: '2025-12-01' },
  { id: 'p15', sku: 'TOY-PUZZLE-001', name: 'Educational Puzzle - Africa Map', slug: 'educational-puzzle-africa-map', description: 'Interactive puzzle teaching African geography. 50 pieces. Ages 5+.', shortDescription: 'Africa map puzzle - 50 pieces, ages 5+', categoryId: 'cat-6', brand: 'EduPlay', price: 45.00, stockQuantity: 40, lowStockThreshold: 5, images: ['🧩'], status: 'active', featured: false, bestSeller: false, newArrival: true, rating: 4.7, reviewCount: 12, createdAt: '2025-10-15', updatedAt: '2025-12-01' },
  { id: 'p16', sku: 'STORY-ANANSI-001', name: 'Anansi Stories for Children', slug: 'anansi-stories-children', description: 'Collection of traditional Anansi stories retold for children. Beautifully illustrated. Ages 4-10.', shortDescription: 'Traditional Anansi stories - illustrated', categoryId: 'cat-7', author: 'Ama Darko', publisher: 'GhanaReads', price: 35.00, stockQuantity: 75, lowStockThreshold: 10, images: ['📚'], status: 'active', featured: true, bestSeller: true, newArrival: false, rating: 4.9, reviewCount: 56, createdAt: '2025-02-01', updatedAt: '2025-12-01' },
  { id: 'p17', sku: 'OFF-PAPER-A4-001', name: 'A4 Printing Paper (500 Sheets)', slug: 'a4-printing-paper-500', description: 'Premium A4 printing paper. 80gsm. 500 sheets per ream. Suitable for all printers.', shortDescription: 'A4 paper - 500 sheets, 80gsm', categoryId: 'cat-8', price: 55.00, salePrice: 48.00, stockQuantity: 200, lowStockThreshold: 20, images: ['📄'], status: 'active', featured: false, bestSeller: true, newArrival: false, rating: 4.5, reviewCount: 43, createdAt: '2025-01-01', updatedAt: '2025-12-01' },
  { id: 'p18', sku: 'TXT-CAM-MATH-P5-001', isbn: '978-9988-123-60-9', name: 'Cambridge Primary Mathematics Stage 5', slug: 'cambridge-primary-mathematics-stage-5', description: 'Cambridge Primary Mathematics textbook for Stage 5. Internationally recognized curriculum.', shortDescription: 'Cambridge Primary Math Stage 5', categoryId: 'cat-10', author: 'Cambridge Press', publisher: 'Cambridge University Press', price: 75.00, stockQuantity: 35, lowStockThreshold: 5, images: ['📘'], status: 'active', featured: true, bestSeller: false, newArrival: true, rating: 4.4, reviewCount: 8, createdAt: '2025-11-01', updatedAt: '2025-12-01' },
  { id: 'p19', sku: 'EXAM-BECE-MATH-001', name: 'BECE Past Questions - Mathematics', slug: 'bece-past-questions-mathematics', description: '10 years of BECE mathematics past questions with detailed solutions. Essential exam preparation.', shortDescription: '10 years BECE Math past questions', categoryId: 'cat-11', price: 30.00, salePrice: 22.00, stockQuantity: 100, lowStockThreshold: 10, images: ['📝'], status: 'active', featured: false, bestSeller: true, newArrival: false, rating: 4.7, reviewCount: 72, createdAt: '2025-03-01', updatedAt: '2025-12-01' },
  { id: 'p20', sku: 'EXAM-WASSCE-SCI-001', name: 'WASSCE Past Questions - Science', slug: 'wassce-past-questions-science', description: 'Comprehensive WASSCE science past questions covering all science subjects with model answers.', shortDescription: 'WASSCE Science past questions with solutions', categoryId: 'cat-11', price: 40.00, stockQuantity: 85, lowStockThreshold: 10, images: ['📝'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.5, reviewCount: 38, createdAt: '2025-03-01', updatedAt: '2025-12-01' },
  { id: 'p21', sku: 'TXT-GHANA-HIST-001', name: 'History of Ghana for SHS', slug: 'history-of-ghana-shs', description: 'Comprehensive history of Ghana textbook for SHS students. Covers pre-colonial to modern Ghana.', shortDescription: 'Ghana history textbook for SHS', categoryId: 'cat-1', author: 'Prof. E.K. Adu', publisher: 'GhanaText Publishers', price: 48.00, stockQuantity: 70, lowStockThreshold: 10, images: ['📖'], status: 'active', featured: false, bestSeller: false, newArrival: true, rating: 4.3, reviewCount: 14, createdAt: '2025-10-01', updatedAt: '2025-12-01' },
  { id: 'p22', sku: 'STN-RULER-30CM-001', name: '30cm Ruler (Transparent)', slug: '30cm-ruler-transparent', description: 'Transparent 30cm ruler with clear markings. Shatterproof.', shortDescription: '30cm transparent ruler', categoryId: 'cat-2', price: 5.00, stockQuantity: 400, lowStockThreshold: 40, images: ['📏'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.2, reviewCount: 25, createdAt: '2025-01-01', updatedAt: '2025-12-01' },
  { id: 'p23', sku: 'STN-ERASER-001', name: 'Pencil Erasers (Pack of 5)', slug: 'pencil-erasers-pack-5', description: 'Soft rubber erasers that erase cleanly without tearing paper. Pack of 5.', shortDescription: 'Soft erasers - pack of 5', categoryId: 'cat-2', price: 5.00, stockQuantity: 350, lowStockThreshold: 35, images: ['🧹'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.1, reviewCount: 18, createdAt: '2025-01-01', updatedAt: '2025-12-01' },
  { id: 'p24', sku: 'TXT-FRENCH-JHS1-001', name: 'French for JHS 1', slug: 'french-jhs-1', description: 'French language textbook for JHS 1. Includes grammar, vocabulary and conversation exercises.', shortDescription: 'JHS 1 French textbook', categoryId: 'cat-1', author: 'Mlle. Akua Frimpong', publisher: 'LearnAfrica Publishers', price: 42.00, stockQuantity: 65, lowStockThreshold: 10, images: ['📖'], status: 'active', featured: false, bestSeller: false, newArrival: true, rating: 4.0, reviewCount: 9, createdAt: '2025-11-01', updatedAt: '2025-12-01' },
  { id: 'p25', sku: 'OFF-STAPLER-001', name: 'Desktop Stapler (Heavy Duty)', slug: 'desktop-stapler-heavy-duty', description: 'Heavy duty desktop stapler. Staples up to 30 sheets. Includes 1000 staples.', shortDescription: 'Heavy duty stapler with 1000 staples', categoryId: 'cat-8', price: 35.00, stockQuantity: 50, lowStockThreshold: 5, images: ['📎'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.4, reviewCount: 15, createdAt: '2025-05-01', updatedAt: '2025-12-01' },
  { id: 'p26', sku: 'STN-SHARPENER-001', name: 'Pencil Sharpener (Metal)', slug: 'pencil-sharpener-metal', description: 'Durable metal pencil sharpener with collection container.', shortDescription: 'Metal pencil sharpener', categoryId: 'cat-2', price: 8.00, stockQuantity: 200, lowStockThreshold: 20, images: ['✏️'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.3, reviewCount: 30, createdAt: '2025-01-01', updatedAt: '2025-12-01' },
  { id: 'p27', sku: 'TXT-ICT-SHS1-001', name: 'ICT for SHS 1', slug: 'ict-shs-1', description: 'Information and Communication Technology textbook for SHS 1. Covers computer fundamentals, programming basics and internet safety.', shortDescription: 'SHS 1 ICT textbook', categoryId: 'cat-1', author: 'Mr. Daniel Owusu', publisher: 'TechBooks Ghana', price: 52.00, salePrice: 45.00, stockQuantity: 90, lowStockThreshold: 10, images: ['💻'], status: 'active', featured: true, bestSeller: false, newArrival: true, rating: 4.2, reviewCount: 11, createdAt: '2025-11-01', updatedAt: '2025-12-01' },
  { id: 'p28', sku: 'TOY-ABC-BLOCK-001', name: 'ABC Building Blocks (100 pcs)', slug: 'abc-building-blocks-100', description: 'Colorful alphabet building blocks for early learners. 100 pieces in storage box. Ages 2+.', shortDescription: '100-piece alphabet blocks - ages 2+', categoryId: 'cat-6', brand: 'EduPlay', price: 55.00, stockQuantity: 30, lowStockThreshold: 5, images: ['🧱'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.8, reviewCount: 19, createdAt: '2025-06-01', updatedAt: '2025-12-01' },
  { id: 'p29', sku: 'STN-COLORBOOK-001', name: 'Coloring Book - Animals of Africa', slug: 'coloring-book-animals-africa', description: 'Beautiful coloring book featuring African animals. 40 pages. Ages 3-8.', shortDescription: 'African animals coloring book - 40 pages', categoryId: 'cat-5', price: 15.00, stockQuantity: 120, lowStockThreshold: 15, images: ['🎨'], status: 'active', featured: false, bestSeller: false, newArrival: true, rating: 4.6, reviewCount: 27, createdAt: '2025-10-01', updatedAt: '2025-12-01' },
  { id: 'p30', sku: 'BAG-KINDER-001', name: 'Kindergarten Backpack - Pink', slug: 'kindergarten-backpack-pink', description: 'Cute and lightweight kindergarten backpack. Easy-open zippers. Padded straps.', shortDescription: 'Lightweight kindergarten backpack', categoryId: 'cat-3', brand: 'SchoolGear', price: 65.00, salePrice: 55.00, stockQuantity: 40, lowStockThreshold: 8, images: ['🎒'], status: 'active', featured: true, bestSeller: false, newArrival: false, rating: 4.5, reviewCount: 16, createdAt: '2025-07-01', updatedAt: '2025-12-01' },
  { id: 'p31', sku: 'TXT-CRE-SHS1-001', name: 'Christian Religious Studies for SHS 1', slug: 'crs-shs-1', description: 'CRS textbook for SHS 1 covering Old and New Testament themes and moral teachings.', shortDescription: 'SHS 1 CRS textbook', categoryId: 'cat-1', author: 'Rev. Samuel Addo', publisher: 'GhanaText Publishers', price: 42.00, stockQuantity: 85, lowStockThreshold: 10, images: ['📖'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.1, reviewCount: 13, createdAt: '2025-06-01', updatedAt: '2025-12-01' },
  { id: 'p32', sku: 'OFF-FILE-A4-001', name: 'A4 Lever Arch File', slug: 'a4-lever-arch-file', description: 'Durable A4 lever arch file. Strong board cover. Metal mechanism. Assorted colors.', shortDescription: 'A4 lever arch file', categoryId: 'cat-8', price: 25.00, stockQuantity: 100, lowStockThreshold: 10, images: ['📁'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.3, reviewCount: 20, createdAt: '2025-04-01', updatedAt: '2025-12-01' },
  { id: 'p33', sku: 'TXT-ENGLISH-PRIMARY4-001', name: 'English for Primary 4', slug: 'english-primary-4', description: 'English language textbook for Primary 4. Reading, writing and comprehension skills.', shortDescription: 'Primary 4 English textbook', categoryId: 'cat-1', author: 'Mrs. Abena Osei', publisher: 'LearnAfrica Publishers', price: 32.00, stockQuantity: 140, lowStockThreshold: 15, images: ['📖'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.4, reviewCount: 22, createdAt: '2025-03-01', updatedAt: '2025-12-01' },
  { id: 'p34', sku: 'STN-GEOMETRY-001', name: 'Geometry Set Box (Premium)', slug: 'geometry-set-box-premium', description: 'Premium geometry set in metal tin. Includes compass, extension, pen holder, protractor, set squares.', shortDescription: 'Premium geometry set in metal case', categoryId: 'cat-4', brand: 'GeoMaster', price: 55.00, stockQuantity: 60, lowStockThreshold: 8, images: ['🧮'], status: 'active', featured: false, bestSeller: false, newArrival: true, rating: 4.7, reviewCount: 14, createdAt: '2025-11-01', updatedAt: '2025-12-01' },
  { id: 'p35', sku: 'STORY-ADVENTURE-001', name: 'African Adventure Stories', slug: 'african-adventure-stories', description: 'Collection of exciting adventure stories set across Africa. For ages 8-14.', shortDescription: 'Adventure stories for ages 8-14', categoryId: 'cat-7', author: 'Kwesi Fletcher', publisher: 'GhanaReads', price: 30.00, stockQuantity: 55, lowStockThreshold: 8, images: ['📚'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.6, reviewCount: 31, createdAt: '2025-05-01', updatedAt: '2025-12-01' },
  { id: 'p36', sku: 'TXT-SYL-MATH-P1-001', name: 'New Syllabus Mathematics Primary 1', slug: 'new-syllabus-math-primary-1', description: 'Mathematics textbook aligned with the new GES primary school syllabus. Activity-based learning approach.', shortDescription: 'Primary 1 Math - New syllabus', categoryId: 'cat-9', author: 'Prof. Kwame Asante', publisher: 'EducPress Ghana', price: 28.00, stockQuantity: 180, lowStockThreshold: 20, images: ['📗'], status: 'active', featured: true, bestSeller: false, newArrival: true, rating: 4.5, reviewCount: 17, createdAt: '2025-10-01', updatedAt: '2025-12-01' },
  { id: 'p37', sku: 'TXT-SYL-ENG-P1-001', name: 'New Syllabus English Primary 1', slug: 'new-syllabus-english-primary-1', description: 'English textbook aligned with the new GES primary school syllabus. Phonics-based approach.', shortDescription: 'Primary 1 English - New syllabus', categoryId: 'cat-9', author: 'Mrs. Abena Osei', publisher: 'LearnAfrica Publishers', price: 28.00, stockQuantity: 175, lowStockThreshold: 20, images: ['📗'], status: 'active', featured: true, bestSeller: false, newArrival: true, rating: 4.4, reviewCount: 14, createdAt: '2025-10-01', updatedAt: '2025-12-01' },
  { id: 'p38', sku: 'STN-SCISSORS-001', name: 'Safety Scissors (Pack of 3)', slug: 'safety-scissors-pack-3', description: 'Child-safe blunt-tip scissors. Pack of 3. Assorted colors.', shortDescription: 'Safety scissors - pack of 3', categoryId: 'cat-2', price: 10.00, stockQuantity: 150, lowStockThreshold: 15, images: ['✂️'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.2, reviewCount: 11, createdAt: '2025-02-01', updatedAt: '2025-12-01' },
  { id: 'p39', sku: 'OFF-WHITEBOARD-001', name: 'Whiteboard Marker (Pack of 4)', slug: 'whiteboard-marker-pack-4', description: 'Low-odor whiteboard markers. Pack of 4 (black, blue, red, green). Easy to erase.', shortDescription: 'Whiteboard markers - pack of 4', categoryId: 'cat-8', price: 20.00, stockQuantity: 80, lowStockThreshold: 10, images: ['🖊️'], status: 'active', featured: false, bestSeller: false, newArrival: false, rating: 4.4, reviewCount: 16, createdAt: '2025-04-01', updatedAt: '2025-12-01' },
  { id: 'p40', sku: 'GEN-ATLAS-001', name: 'Oxford School Atlas of Africa', slug: 'oxford-school-atlas-africa', description: 'Comprehensive school atlas focusing on Africa. Maps, statistics and geography facts. For JHS and SHS.', shortDescription: 'African school atlas - JHS/SHS', categoryId: 'cat-12', publisher: 'Oxford University Press', price: 65.00, salePrice: 55.00, stockQuantity: 45, lowStockThreshold: 5, images: ['🗺️'], status: 'active', featured: true, bestSeller: false, newArrival: false, rating: 4.7, reviewCount: 24, createdAt: '2025-03-01', updatedAt: '2025-12-01' },
];

// ============ SCHOOLS ============
export const schools: School[] = [
  { id: 'sch-1', name: 'Accra Academy', slug: 'accra-academy', logo: '🏫', location: 'Accra', description: 'One of the most prestigious secondary schools in Ghana, known for academic excellence.', type: 'shs', active: true },
  { id: 'sch-2', name: 'Holy Child School', slug: 'holy-child-school', logo: '🏫', location: 'Cape Coast', description: 'A leading girls secondary school with a strong tradition of academic achievement.', type: 'shs', active: true },
  { id: 'sch-3', name: 'Achimota School', slug: 'achimota-school', logo: '🏫', location: 'Achimota, Accra', description: 'Historic co-educational boarding school known for producing national leaders.', type: 'shs', active: true },
  { id: 'sch-4', name: 'West International School', slug: 'west-international-school', logo: '🏫', location: 'Accra', description: 'Premier international school offering Cambridge and GES curricula.', type: 'international', active: true },
  { id: 'sch-5', name: 'Bright Future Primary', slug: 'bright-future-primary', logo: '🏫', location: 'Tema', description: 'Excellent primary school with modern teaching methods and facilities.', type: 'primary', active: true },
];

// ============ ACADEMIC YEARS ============
export const academicYears: AcademicYear[] = [
  { id: 'ay-1', name: '2024/2025', startYear: 2024, endYear: 2025 },
  { id: 'ay-2', name: '2025/2026', startYear: 2025, endYear: 2026 },
  { id: 'ay-3', name: '2026/2027', startYear: 2026, endYear: 2027 },
];

// ============ SCHOOL CLASSES ============
export const schoolClasses: SchoolClass[] = [
  { id: 'cls-1', name: 'SHS 1', level: 'SHS', schoolId: 'sch-1' },
  { id: 'cls-2', name: 'SHS 2', level: 'SHS', schoolId: 'sch-1' },
  { id: 'cls-3', name: 'SHS 3', level: 'SHS', schoolId: 'sch-1' },
  { id: 'cls-4', name: 'SHS 1', level: 'SHS', schoolId: 'sch-2' },
  { id: 'cls-5', name: 'SHS 2', level: 'SHS', schoolId: 'sch-2' },
  { id: 'cls-6', name: 'SHS 1', level: 'SHS', schoolId: 'sch-3' },
  { id: 'cls-7', name: 'SHS 2', level: 'SHS', schoolId: 'sch-3' },
  { id: 'cls-8', name: 'Primary 5', level: 'Primary', schoolId: 'sch-4' },
  { id: 'cls-9', name: 'Primary 6', level: 'Primary', schoolId: 'sch-4' },
  { id: 'cls-10', name: 'Primary 1', level: 'Primary', schoolId: 'sch-5' },
  { id: 'cls-11', name: 'Primary 2', level: 'Primary', schoolId: 'sch-5' },
  { id: 'cls-12', name: 'JHS 1', level: 'JHS', schoolId: 'sch-5' },
];

// ============ SCHOOL REQUIREMENTS ============
export const schoolRequirements: SchoolRequirement[] = [
  // Accra Academy SHS 1
  { id: 'req-1', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'Mathematics', category: 'textbook', productId: 'p1', quantity: 1, required: true },
  { id: 'req-2', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'English', category: 'textbook', productId: 'p2', quantity: 1, required: true },
  { id: 'req-3', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'Integrated Science', category: 'textbook', productId: 'p3', quantity: 1, required: true },
  { id: 'req-4', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'Social Studies', category: 'textbook', productId: 'p4', quantity: 1, required: true },
  { id: 'req-5', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'ICT', category: 'textbook', productId: 'p27', quantity: 1, required: true },
  { id: 'req-6', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'Stationery', category: 'stationery', productId: 'p7', quantity: 1, required: true },
  { id: 'req-7', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'Stationery', category: 'stationery', productId: 'p8', quantity: 1, required: true },
  { id: 'req-8', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'Stationery', category: 'stationery', productId: 'p9', quantity: 1, required: true },
  { id: 'req-9', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'Mathematical Set', category: 'other', productId: 'p10', quantity: 1, required: true },
  { id: 'req-10', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1', subject: 'School Bag', category: 'other', productId: 'p12', quantity: 1, required: false },
  // Holy Child SHS 1
  { id: 'req-11', schoolId: 'sch-2', academicYearId: 'ay-3', classId: 'cls-4', subject: 'Mathematics', category: 'textbook', productId: 'p1', quantity: 1, required: true },
  { id: 'req-12', schoolId: 'sch-2', academicYearId: 'ay-3', classId: 'cls-4', subject: 'English', category: 'textbook', productId: 'p2', quantity: 1, required: true },
  { id: 'req-13', schoolId: 'sch-2', academicYearId: 'ay-3', classId: 'cls-4', subject: 'Integrated Science', category: 'textbook', productId: 'p3', quantity: 1, required: true },
  { id: 'req-14', schoolId: 'sch-2', academicYearId: 'ay-3', classId: 'cls-4', subject: 'Social Studies', category: 'textbook', productId: 'p4', quantity: 1, required: true },
  { id: 'req-15', schoolId: 'sch-2', academicYearId: 'ay-3', classId: 'cls-4', subject: 'Stationery', category: 'stationery', productId: 'p7', quantity: 1, required: true },
  { id: 'req-16', schoolId: 'sch-2', academicYearId: 'ay-3', classId: 'cls-4', subject: 'Mathematical Set', category: 'other', productId: 'p10', quantity: 1, required: true },
  // Achimota SHS 1
  { id: 'req-17', schoolId: 'sch-3', academicYearId: 'ay-3', classId: 'cls-6', subject: 'Mathematics', category: 'textbook', productId: 'p1', quantity: 1, required: true },
  { id: 'req-18', schoolId: 'sch-3', academicYearId: 'ay-3', classId: 'cls-6', subject: 'English', category: 'textbook', productId: 'p2', quantity: 1, required: true },
  { id: 'req-19', schoolId: 'sch-3', academicYearId: 'ay-3', classId: 'cls-6', subject: 'Integrated Science', category: 'textbook', productId: 'p3', quantity: 1, required: true },
  { id: 'req-20', schoolId: 'sch-3', academicYearId: 'ay-3', classId: 'cls-6', subject: 'Social Studies', category: 'textbook', productId: 'p4', quantity: 1, required: true },
  { id: 'req-21', schoolId: 'sch-3', academicYearId: 'ay-3', classId: 'cls-6', subject: 'Stationery', category: 'stationery', productId: 'p7', quantity: 1, required: true },
  { id: 'req-22', schoolId: 'sch-3', academicYearId: 'ay-3', classId: 'cls-6', subject: 'Stationery', category: 'stationery', productId: 'p8', quantity: 1, required: true },
  { id: 'req-23', schoolId: 'sch-3', academicYearId: 'ay-3', classId: 'cls-6', subject: 'Mathematical Set', category: 'other', productId: 'p10', quantity: 1, required: true },
  // Bright Future Primary 1
  { id: 'req-24', schoolId: 'sch-5', academicYearId: 'ay-3', classId: 'cls-10', subject: 'Mathematics', category: 'textbook', productId: 'p36', quantity: 1, required: true },
  { id: 'req-25', schoolId: 'sch-5', academicYearId: 'ay-3', classId: 'cls-10', subject: 'English', category: 'textbook', productId: 'p37', quantity: 1, required: true },
  { id: 'req-26', schoolId: 'sch-5', academicYearId: 'ay-3', classId: 'cls-10', subject: 'Stationery', category: 'stationery', productId: 'p7', quantity: 1, required: true },
  { id: 'req-27', schoolId: 'sch-5', academicYearId: 'ay-3', classId: 'cls-10', subject: 'Stationery', category: 'stationery', productId: 'p9', quantity: 1, required: true },
  { id: 'req-28', schoolId: 'sch-5', academicYearId: 'ay-3', classId: 'cls-10', subject: 'Art', category: 'other', productId: 'p13', quantity: 1, required: false },
  { id: 'req-29', schoolId: 'sch-5', academicYearId: 'ay-3', classId: 'cls-10', subject: 'School Bag', category: 'other', productId: 'p30', quantity: 1, required: false },
];

// ============ SCHOOL PACKAGES ============
export const schoolPackages: SchoolPackage[] = [
  {
    id: 'pkg-1', schoolId: 'sch-1', academicYearId: 'ay-3', classId: 'cls-1',
    name: 'Accra Academy SHS 1 Complete Package', slug: 'accra-academy-shs-1-package',
    items: [
      { productId: 'p1', quantity: 1, required: true },
      { productId: 'p2', quantity: 1, required: true },
      { productId: 'p3', quantity: 1, required: true },
      { productId: 'p4', quantity: 1, required: true },
      { productId: 'p27', quantity: 1, required: true },
      { productId: 'p7', quantity: 1, required: true },
      { productId: 'p8', quantity: 1, required: true },
      { productId: 'p9', quantity: 1, required: true },
      { productId: 'p10', quantity: 1, required: true },
    ],
    retailPrice: 350, packagePrice: 310, savings: 40, available: true
  },
  {
    id: 'pkg-2', schoolId: 'sch-2', academicYearId: 'ay-3', classId: 'cls-4',
    name: 'Holy Child SHS 1 Complete Package', slug: 'holy-child-shs-1-package',
    items: [
      { productId: 'p1', quantity: 1, required: true },
      { productId: 'p2', quantity: 1, required: true },
      { productId: 'p3', quantity: 1, required: true },
      { productId: 'p4', quantity: 1, required: true },
      { productId: 'p7', quantity: 1, required: true },
      { productId: 'p10', quantity: 1, required: true },
    ],
    retailPrice: 283, packagePrice: 255, savings: 28, available: true
  },
  {
    id: 'pkg-3', schoolId: 'sch-3', academicYearId: 'ay-3', classId: 'cls-6',
    name: 'Achimota School SHS 1 Complete Package', slug: 'achimota-shs-1-package',
    items: [
      { productId: 'p1', quantity: 1, required: true },
      { productId: 'p2', quantity: 1, required: true },
      { productId: 'p3', quantity: 1, required: true },
      { productId: 'p4', quantity: 1, required: true },
      { productId: 'p7', quantity: 1, required: true },
      { productId: 'p8', quantity: 1, required: true },
      { productId: 'p10', quantity: 1, required: true },
    ],
    retailPrice: 325, packagePrice: 290, savings: 35, available: true
  },
  {
    id: 'pkg-4', schoolId: 'sch-5', academicYearId: 'ay-3', classId: 'cls-10',
    name: 'Bright Future Primary 1 Complete Package', slug: 'bright-future-primary-1-package',
    items: [
      { productId: 'p36', quantity: 1, required: true },
      { productId: 'p37', quantity: 1, required: true },
      { productId: 'p7', quantity: 1, required: true },
      { productId: 'p9', quantity: 1, required: true },
      { productId: 'p13', quantity: 1, required: false },
      { productId: 'p30', quantity: 1, required: false },
    ],
    retailPrice: 183, packagePrice: 160, savings: 23, available: true
  },
];

// ============ DELIVERY ZONES ============
export const deliveryZones: DeliveryZone[] = [
  { id: 'dz-1', name: 'Accra Central', fee: 15, estimatedDays: '1-2 days', active: true },
  { id: 'dz-2', name: 'Greater Accra', fee: 25, estimatedDays: '2-3 days', active: true },
  { id: 'dz-3', name: 'Ashanti Region', fee: 35, estimatedDays: '3-4 days', active: true },
  { id: 'dz-4', name: 'Western Region', fee: 40, estimatedDays: '3-5 days', active: true },
  { id: 'dz-5', name: 'Northern Region', fee: 50, estimatedDays: '4-6 days', active: true },
  { id: 'dz-6', name: 'Other Regions', fee: 45, estimatedDays: '4-6 days', active: true },
];

// ============ REVIEWS ============
export const reviews: Review[] = [
  { id: 'rev-1', productId: 'p1', customerId: 'cust-1', customerName: 'Akua M.', rating: 5, title: 'Excellent textbook', comment: 'Very comprehensive and well-explained. My son loves it.', approved: true, createdAt: '2025-11-15' },
  { id: 'rev-2', productId: 'p1', customerId: 'cust-2', customerName: 'Kofi A.', rating: 4, title: 'Good book', comment: 'Covers all the topics needed for SHS 1. Some chapters could use more examples.', approved: true, createdAt: '2025-11-20' },
  { id: 'rev-3', productId: 'p3', customerId: 'cust-3', customerName: 'Ama D.', rating: 5, title: 'Best science book', comment: 'Clear explanations and great diagrams. Highly recommended!', approved: true, createdAt: '2025-12-01' },
  { id: 'rev-4', productId: 'p16', customerId: 'cust-4', customerName: 'Yaa B.', rating: 5, title: 'My kids love it!', comment: 'Beautiful illustrations. The Anansi stories are well retold for children.', approved: true, createdAt: '2025-11-10' },
  { id: 'rev-5', productId: 'p10', customerId: 'cust-5', customerName: 'Kwame S.', rating: 4, title: 'Quality set', comment: 'Good quality mathematical set. The case is sturdy.', approved: true, createdAt: '2025-10-25' },
  { id: 'rev-6', productId: 'p19', customerId: 'cust-6', customerName: 'Efua K.', rating: 5, title: 'Essential for BECE prep', comment: 'Very helpful past questions compilation. Solutions are detailed.', approved: true, createdAt: '2025-11-05' },
  { id: 'rev-7', productId: 'p7', customerId: 'cust-7', customerName: 'Nana O.', rating: 5, title: 'Great value', comment: 'Good quality exercise books at a fair price. Will buy again.', approved: true, createdAt: '2025-12-02' },
];

// ============ DEMO ORDERS ============
export const demoOrders: Order[] = [
  {
    id: 'ord-1', orderNumber: 'FOC1001', customerId: 'cust-1',
    items: [
      { productId: 'p1', productName: 'Core Mathematics for SHS 1', quantity: 1, unitPrice: 48.00, totalPrice: 48.00 },
      { productId: 'p2', productName: 'English Language for SHS 1', quantity: 1, unitPrice: 50.00, totalPrice: 50.00 },
    ],
    subtotal: 98.00, discount: 0, deliveryFee: 15.00, total: 113.00,
    paymentStatus: 'paid', orderStatus: 'completed', deliveryMethod: 'delivery',
    address: '15 Independence Ave, Accra', notes: '', createdAt: '2025-11-20', updatedAt: '2025-11-22'
  },
  {
    id: 'ord-2', orderNumber: 'FOC1002', customerId: 'cust-2',
    items: [
      { productId: 'p7', productName: 'Exercise Book A5 (Pack of 10)', quantity: 2, unitPrice: 20.00, totalPrice: 40.00 },
      { productId: 'p8', productName: 'Ballpoint Pen Blue (Pack of 12)', quantity: 1, unitPrice: 15.00, totalPrice: 15.00 },
      { productId: 'p10', productName: 'Mathematical Set (Complete)', quantity: 1, unitPrice: 28.00, totalPrice: 28.00 },
    ],
    subtotal: 83.00, discount: 5.00, deliveryFee: 0, total: 78.00,
    paymentStatus: 'paid', orderStatus: 'ready_for_pickup', deliveryMethod: 'pickup',
    address: '', notes: 'Will pick up after 4pm', createdAt: '2025-12-01', updatedAt: '2025-12-02'
  },
  {
    id: 'ord-3', orderNumber: 'FOC1003', customerId: 'cust-3',
    items: [
      { productId: 'p11', productName: 'Primary School Backpack - Blue', quantity: 1, unitPrice: 70.00, totalPrice: 70.00 },
      { productId: 'p13', productName: 'Crayons Set (24 Colors)', quantity: 1, unitPrice: 18.00, totalPrice: 18.00 },
    ],
    subtotal: 88.00, discount: 0, deliveryFee: 25.00, total: 113.00,
    paymentStatus: 'paid', orderStatus: 'out_for_delivery', deliveryMethod: 'delivery',
    address: '23 Community 25, Tema', notes: '', createdAt: '2025-12-03', updatedAt: '2025-12-04'
  },
];

// ============ DEMO CUSTOMERS ============
export const demoCustomers: Customer[] = [
  { id: 'cust-1', fullName: 'Akua Mensah', phone: '0241234567', email: 'akua@example.com', address: '15 Independence Ave', city: 'Accra', children: [{ id: 'child-1', name: 'Kwame Mensah', schoolId: 'sch-1', classId: 'cls-1', academicYearId: 'ay-3' }], role: 'customer' },
  { id: 'cust-2', fullName: 'Kofi Asante', phone: '0201234567', email: 'kofi@example.com', address: '8 Osu Rd', city: 'Accra', children: [], role: 'customer' },
  { id: 'cust-3', fullName: 'Ama Darko', phone: '0271234567', email: 'ama@example.com', address: '23 Community 25', city: 'Tema', children: [{ id: 'child-2', name: 'Kofi Darko', schoolId: 'sch-5', classId: 'cls-10', academicYearId: 'ay-3' }], role: 'customer' },
  { id: 'admin-1', fullName: 'Admin User', phone: '0301234567', email: 'admin@focus.com', address: '', city: '', children: [], role: 'admin' },
];

// ============ HELPER FUNCTIONS ============
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId);
}

export function getSchoolBySlug(slug: string): School | undefined {
  return schools.find(s => s.slug === slug);
}

export function getClassesForSchool(schoolId: string): SchoolClass[] {
  return schoolClasses.filter(c => c.schoolId === schoolId);
}

export function getRequirementsForClass(schoolId: string, classId: string, academicYearId: string): SchoolRequirement[] {
  return schoolRequirements.filter(r => r.schoolId === schoolId && r.classId === classId && r.academicYearId === academicYearId);
}

export function getPackageForClass(schoolId: string, classId: string, academicYearId: string): SchoolPackage | undefined {
  return schoolPackages.find(p => p.schoolId === schoolId && p.classId === classId && p.academicYearId === academicYearId);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.author?.toLowerCase().includes(q) ||
    p.publisher?.toLowerCase().includes(q) ||
    p.isbn?.includes(q) ||
    p.sku.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

export function formatPrice(price: number): string {
  return `GH₵${price.toFixed(2)}`;
}

export function getDiscountPercentage(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}
