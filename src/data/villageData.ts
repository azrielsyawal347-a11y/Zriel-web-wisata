export type DestinationCategory = 'semua' | 'alam' | 'edukasi' | 'inap';

export interface Destination {
  id: string;
  name: string;
  category: Exclude<DestinationCategory, 'semua'>;
  categoryLabel: string;
  ticketInfo: string;
  hours: string;
  walkTime: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  facilities: string[];
  bestTime: string;
  image: string;
  imageAlt: string;
}

export type PackageCategory = 'semua' | 'edukasi' | 'camping' | 'outbound' | 'homestay';

export interface TourPackage {
  id: string;
  name: string;
  category: Exclude<PackageCategory, 'semua'>;
  categoryLabel: string;
  price: number;
  priceUnit: string;
  minPeople: number;
  maxPeople: number;
  duration: string;
  summary: string;
  includes: string[];
  note: string;
  featured?: boolean;
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  caption: string;
  image: string;
  imageAlt: string;
}

export interface MapSpot {
  id: string;
  label: string;
  shortName: string;
  zone: string;
  distanceFromGate: string;
  elevation: string;
  description: string;
  facilities: string;
  x: number;
  y: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const WHATSAPP_NUMBER = '6281234567890';
export const WHATSAPP_DISPLAY = '0812-3456-7890';

export const VILLAGE_PROFILE = {
  brandName: 'Lereng Asri',
  fullName: 'Desa Wisata Lereng Asri',
  address: 'Jl. Raya Lereng Asri No. 18, Dusun Sumber Rejo, Kec. Karangrejo, Kab. Magelang, Jawa Tengah 56153',
  coordinates: '-7.4797, 110.2177',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-7.4797,110.2177',
  operationalHours: 'Setiap Hari, 07.00 – 17.00 WIB',
  overnightNote: 'Check-in Camping & Homestay dilayani hingga 20.00 WIB',
  elevation: '1.150 mdpl',
  heroImage: '/src/assets/images/hero_lereng_asri_1794887950283.jpg',
  heroAlt: 'Panorama pagi Desa Wisata Lereng Asri dengan saung bambu, terasering hijau, dan kabut pegunungan',
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'puncak-pinus',
    name: 'Gardu Pandang Puncak Pinus',
    category: 'alam',
    categoryLabel: 'Alam & Panorama',
    ticketInfo: 'Rp 15.000/orang',
    hours: '05.30 – 17.30 WIB',
    walkTime: '10 menit dari area parkir',
    shortDesc: 'Anjungan kayu di tepi hutan pinus dengan pemandangan matahari terbit dan lautan kabut lembah.',
    fullDesc:
      'Nikmati suasana pagi paling tenang di ketinggian 1.150 mdpl. Gardu pandang kayu kami menghadap langsung ke bentang lembah hijau dan barisan pegunungan, cocok untuk berfoto keluarga maupun bersantai menyeruput teh hangat.',
    highlights: [
      'Spot terbaik melihat matahari terbit pukul 05.45 – 06.30 WIB',
      'Jalur tangga kayu landai dan ramah untuk anak serta lansia',
      'Warung kopi lereng dengan menu wedang jahe dan pisang goreng',
    ],
    facilities: ['Gazebo istirahat', 'Toilet bersih', 'Mushola pinus', 'Area foto'],
    bestTime: '05.30 – 08.30 WIB',
    image: '/src/assets/images/dest_puncak_pinus_1794887951307.jpg',
    imageAlt: 'Gardu pandang kayu di hutan pinus Puncak Pinus menghadap lembah hijau saat matahari terbit',
  },
  {
    id: 'air-terjun-embun',
    name: 'Curug Embun Lestari',
    category: 'alam',
    categoryLabel: 'Air & Rimba',
    ticketInfo: 'Rp 15.000/orang',
    hours: '07.00 – 16.30 WIB',
    walkTime: '15 menit jalan setapak rapi',
    shortDesc: 'Air terjun berundak alami dengan kolam jernih yang sejuk di tengah rumpun bambu dan pakis gunung.',
    fullDesc:
      'Sumber mata air pegunungan yang mengalir jernih sepanjang tahun. Dikelilingi bebatuan vulkanik berlumut dan rimbunnya hutan bambu, pengunjung dapat bermain air di kolam dangkal yang aman sambil mendengarkan gemericik air alami.',
    highlights: [
      'Akses jalur batu bertangga dengan pegangan bambu yang kokoh',
      'Kolam alami dangkal dan aman untuk merendam kaki',
      'Udara lembap yang sejuk dan bebas polusi kendaraan',
    ],
    facilities: ['Ruang bilas & ganti', 'Pos jaga keselamatan', 'Penitipan barang', 'Pendopo teduh'],
    bestTime: '08.00 – 11.30 WIB',
    image: '/src/assets/images/dest_air_terjun_1794887951190.jpg',
    imageAlt: 'Curug Embun Lestari dengan air jernih berundak di antara pepohonan rimbun dan pakis gunung',
  },
  {
    id: 'kebun-edukasi',
    name: 'Kebun Edukasi & Kopi Organik',
    category: 'edukasi',
    categoryLabel: 'Wisata Edukasi',
    ticketInfo: 'Rp 20.000/orang',
    hours: '07.30 – 16.30 WIB',
    walkTime: '5 menit dari pendopo utama',
    shortDesc: 'Terasering kebun sayur organik dan tanaman kopi arabika tempat wisatawan belajar langsung bersama petani.',
    fullDesc:
      'Dirancang khusus untuk keluarga, rombongan sekolah, dan pelajar. Pengunjung diajak menyusuri jembatan bambu di tengah kebun bertingkat, mengenal cara tanam tanpa pestisida kimia, memetik panen segar, hingga melihat proses sangrai kopi lereng.',
    highlights: [
      'Dipandu langsung oleh kelompok tani lokal Desa Lereng Asri',
      'Anak-anak dapat membawa pulang 1 bibit tanaman dalam polybag',
      'Tersedia hasil panen sayur segar dan bubuk kopi sangrai khas desa',
    ],
    facilities: ['Pendopo belajar', 'Area cuci tangan', 'Kios oleh-oleh tani', 'Toilet'],
    bestTime: '08.30 – 14.00 WIB',
    image: '/src/assets/images/dest_kebun_edukasi_1794887952097.jpg',
    imageAlt: 'Jembatan bambu melintasi kebun sayur organik dan kopi terasering di lereng gunung',
  },
  {
    id: 'lembah-kemah-joglo',
    name: 'Lembah Kemah & Kampung Joglo',
    category: 'inap',
    categoryLabel: 'Camping & Menginap',
    ticketInfo: 'Mulai Rp 145.000/malam',
    hours: '24 Jam (Check-in s.d. 20.00 WIB)',
    walkTime: '3 menit dari area parkir utama',
    shortDesc: 'Hamparan rumput datar untuk berkemah dan deretan rumah kayu tradisional hangat dengan latar gunung.',
    fullDesc:
      'Kawasan bermalam yang tenang dan tertata rapi di tepi hutan pinus. Dilengkapi jalur setapak batu, perapian bersama untuk menghangatkan malam, serta pilihan tenda kanvas siap pakai maupun rumah kayu joglo yang nyaman untuk keluarga.',
    highlights: [
      'Penerangan taman hangat dan penjagaan keamanan desa 24 jam',
      'Area api unggun komunal dan makan malam khas masakan desa',
      'Pemandangan langsung ke lereng gunung saat membuka pintu pagi hari',
    ],
    facilities: ['Kamar mandi air hangat', 'Mushola', 'Colokan listrik tiap blok', 'Dapur desa'],
    bestTime: 'Sore hingga pagi hari',
    image: '/src/assets/images/pkg_camping_homestay_1794887952690.jpg',
    imageAlt: 'Tenda glamping kanvas dan homestay kayu tradisional di bawah langit senja pegunungan dengan api unggun',
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'paket-edukasi',
    name: 'Paket Edukasi Alam & Tani',
    category: 'edukasi',
    categoryLabel: 'Edukasi & Sekolah',
    price: 65000,
    priceUnit: 'per orang',
    minPeople: 10,
    maxPeople: 120,
    duration: '± 4 Jam (08.00 – 12.00 WIB)',
    summary: 'Belajar bercocok tanam organik, mengenal proses kopi gunung, dan jelajah alam bersama pemandu desa.',
    includes: [
      'Tiket masuk terusan kawasan & Kebun Edukasi',
      'Pemandu lokal ramah selama kegiatan',
      'Praktik tanam bibit & 1 bibit bawa pulang',
      'Snack tradisional & minuman hangat jahe/kopi',
    ],
    note: 'Cocok untuk study tour sekolah, komunitas, dan keluarga besar.',
    image: '/src/assets/images/dest_kebun_edukasi_1794887952097.jpg',
    imageAlt: 'Wisatawan berjalan di jalur bambu kebun edukasi Desa Wisata Lereng Asri',
  },
  {
    id: 'paket-camping',
    name: 'Paket Camping Ceria Lereng',
    category: 'camping',
    categoryLabel: 'Camping 2H1M',
    price: 145000,
    priceUnit: 'per orang',
    minPeople: 2,
    maxPeople: 40,
    duration: '2 Hari 1 Malam',
    summary: 'Berkemah praktis tanpa repot membawa perlengkapan. Tenda sudah terpasang rapi dengan sarapan hangat.',
    includes: [
      'Tenda dome/kanvas kapasitas 2–4 orang + matras & sleeping bag',
      'Tiket masuk kawasan wisata & Puncak Pinus',
      'Kayu bakar api unggun bersama di malam hari',
      '1x Sarapan pagi menu hangat khas desa',
    ],
    note: 'Tersedia fasilitas kamar mandi air hangat dan colokan listrik.',
    featured: true,
    image: '/src/assets/images/pkg_camping_homestay_1794887952690.jpg',
    imageAlt: 'Area perkemahan dan api unggun hangat di Lereng Asri pada waktu senja',
  },
  {
    id: 'paket-outbound',
    name: 'Paket Outbound & Kebersamaan',
    category: 'outbound',
    categoryLabel: 'Rombongan & Kantor',
    price: 120000,
    priceUnit: 'per orang',
    minPeople: 15,
    maxPeople: 150,
    duration: 'Seharian (08.00 – 15.00 WIB)',
    summary: 'Kegiatan team building seru di lapangan rumput pinus lengkap dengan makan siang prasmanan khas desa.',
    includes: [
      '5 sesi permainan kekompakan & ice breaking seru',
      'Master game & fasilitator berpengalaman',
      '1x Makan siang prasmanan masakan tradisional + air mineral',
      'Sound system lapangan & dokumentasi foto kegiatan',
    ],
    note: 'Materi permainan dapat disesuaikan untuk tim kantor atau keluarga.',
    image: '/src/assets/images/dest_puncak_pinus_1794887951307.jpg',
    imageAlt: 'Pemandangan hutan pinus asri untuk kegiatan outbound rombongan',
  },
  {
    id: 'paket-homestay',
    name: 'Paket Homestay Rumah Joglo',
    category: 'homestay',
    categoryLabel: 'Menginap Keluarga',
    price: 450000,
    priceUnit: 'per unit / malam',
    minPeople: 1,
    maxPeople: 10,
    duration: 'Check-in 14.00 · Check-out 12.00 WIB',
    summary: 'Menginap nyaman di rumah kayu tradisional warga yang bersih, hangat, dengan beranda menghadap lembah.',
    includes: [
      '1 unit rumah kayu privat (maksimal 4 tamu per unit)',
      '2 tempat tidur nyaman, selimut tebal & air hangat',
      'Sarapan pagi untuk 4 orang & suguhan teh/kopi sore',
      'Bebas akses seluruh spot foto & area kebun desa',
    ],
    note: 'Harga Rp 450.000 dihitung per unit rumah per malam (muat hingga 4 orang).',
    image: '/src/assets/images/hero_lereng_asri_1794887950283.jpg',
    imageAlt: 'Deretan bangunan kayu dan bambu homestay tradisional di Lereng Asri',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Suasana Pagi Kampung Bambu',
    location: 'Zona Tengah Desa',
    caption: 'Kabut tipis menyelimuti terasering dan saung bambu tepat pukul 06.30 WIB.',
    image: '/src/assets/images/hero_lereng_asri_1794887950283.jpg',
    imageAlt: 'Kampung wisata bambu di lereng pegunungan saat pagi hari',
  },
  {
    id: 'gal-2',
    title: 'Matahari Terbit di Puncak Pinus',
    location: 'Gardu Pandang Timur',
    caption: 'Pengunjung menikmati hangatnya sinar matahari pertama dari anjungan kayu pinus.',
    image: '/src/assets/images/dest_puncak_pinus_1794887951307.jpg',
    imageAlt: 'Dua pengunjung berdiri di dek kayu Puncak Pinus memandang pegunungan',
  },
  {
    id: 'gal-3',
    title: 'Kesegaran Curug Embun Lestari',
    location: 'Lembah Barat',
    caption: 'Air terjun alami berundak yang jernih dan sejuk di bawah naungan hutan bambu.',
    image: '/src/assets/images/dest_air_terjun_1794887951190.jpg',
    imageAlt: 'Air terjun alami di tengah hutan hijau Desa Wisata Lereng Asri',
  },
  {
    id: 'gal-4',
    title: 'Panen Sayur di Kebun Edukasi',
    location: 'Terasering Selatan',
    caption: 'Jembatan bambu membelah kebun kopi dan sayuran organik milik warga desa.',
    image: '/src/assets/images/dest_kebun_edukasi_1794887952097.jpg',
    imageAlt: 'Jalur bambu di kebun sayur dan kopi organik lereng gunung',
  },
  {
    id: 'gal-5',
    title: 'Malam Hangat di Lembah Kemah',
    location: 'Area Camping & Joglo',
    caption: 'Api unggun dan lentera hangat menemani suasana malam yang tenang di pegunungan.',
    image: '/src/assets/images/pkg_camping_homestay_1794887952690.jpg',
    imageAlt: 'Tenda glamping dan rumah kayu dengan api unggun di senja hari',
  },
];

export const MAP_SPOTS: MapSpot[] = [
  {
    id: 'gerbang',
    label: 'Gerbang Utama & Pusat Info',
    shortName: 'Gerbang & Parkir',
    zone: 'Pintu Masuk Desa',
    distanceFromGate: 'Titik awal kunjungan (0 m)',
    elevation: '1.120 mdpl',
    description: 'Area parkir luas untuk motor, mobil pribadi, hingga bus medium. Tersedia loket tiket resmi dan pusat informasi wisata.',
    facilities: 'Parkir luas · Loket tiket · Toilet · Pusat informasi',
    x: 20,
    y: 78,
  },
  {
    id: 'kebun',
    label: 'Kebun Edukasi & Kopi Organik',
    shortName: 'Kebun Edukasi',
    zone: 'Terasering Selatan',
    distanceFromGate: '250 m · 5 menit jalan kaki',
    elevation: '1.140 mdpl',
    description: 'Jalur jembatan bambu di tengah hamparan sayur organik, tanaman kopi, dan pendopo belajar bersama petani lokal.',
    facilities: 'Pendopo tani · Kios oleh-oleh · Area cuci tangan',
    x: 42,
    y: 62,
  },
  {
    id: 'camping',
    label: 'Lembah Kemah & Homestay Joglo',
    shortName: 'Camping & Joglo',
    zone: 'Zona Tengah Asri',
    distanceFromGate: '300 m · 6 menit jalan kaki',
    elevation: '1.150 mdpl',
    description: 'Lokasi tenda kanvas, lapangan outbound rumput, area api unggun malam, dan deretan homestay kayu tradisional.',
    facilities: 'Kamar mandi air hangat · Mushola · Dapur desa',
    x: 56,
    y: 46,
  },
  {
    id: 'curug',
    label: 'Curug Embun Lestari',
    shortName: 'Curug Embun',
    zone: 'Lembah Barat',
    distanceFromGate: '650 m · 15 menit jalan kaki',
    elevation: '1.095 mdpl',
    description: 'Air terjun alami dua tingkat dengan kolam jernih yang aman untuk bermain air dan bersantai di bawah rindang bambu.',
    facilities: 'Ruang bilas · Pos jaga · Pendopo teduh',
    x: 26,
    y: 34,
  },
  {
    id: 'pinus',
    label: 'Gardu Pandang Puncak Pinus',
    shortName: 'Puncak Pinus',
    zone: 'Punggungan Timur',
    distanceFromGate: '550 m · 10 menit jalan kaki',
    elevation: '1.210 mdpl',
    description: 'Titik tertinggi di kawasan wisata untuk menyaksikan matahari terbit, lautan kabut pagi, dan panorama lembah.',
    facilities: 'Dek kayu luas · Warung kopi lereng · Gazebo',
    x: 80,
    y: 24,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Apakah akses jalan menuju Desa Wisata Lereng Asri aman untuk mobil keluarga atau bus?',
    answer:
      'Ya, jalan menuju gerbang utama sudah beraspal mulus dengan lebar memadai. Kendaraan pribadi, minibus travel, hingga bus ukuran medium (30–35 seat) dapat masuk dan parkir langsung di area parkir utama kami.',
  },
  {
    id: 'faq-2',
    question: 'Apakah bisa datang langsung tanpa reservasi terlebih dahulu?',
    answer:
      'Untuk kunjungan wisata harian (tiket masuk destinasi dan kebun), Anda bisa langsung datang setiap hari pukul 07.00 – 17.00 WIB. Namun untuk Paket Edukasi, Outbound, Camping, dan Homestay sangat disarankan memesan via WhatsApp minimal H-2 agar tenda, kamar, dan konsumsi siap menyambut Anda.',
  },
  {
    id: 'faq-3',
    question: 'Bagaimana jika membawa anak kecil atau orang tua/lansia?',
    answer:
      'Kawasan pendopo utama, Kebun Edukasi, dan area Homestay memiliki jalur datar serta berundak landai yang nyaman untuk anak-anak maupun lansia. Jalur menuju Curug Embun juga sudah dilengkapi anak tangga batu dan pegangan bambu.',
  },
  {
    id: 'faq-4',
    question: 'Bagaimana sistem pembayaran saat memesan paket wisata?',
    answer:
      'Setelah Anda menekan tombol Pesan via WhatsApp, tim admin desa kami akan mengonfirmasi ketersediaan tanggal dan mengirimkan rincian total biaya. Pembayaran DP maupun pelunasan dikoordinasikan langsung dengan admin resmi kami melalui WhatsApp.',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
