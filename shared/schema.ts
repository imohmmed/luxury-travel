import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define base schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tourism application data models
export interface Destination {
  id: number;
  name: string;
  icon: string;
}

export interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  comment: string;
}

export interface Video {
  id: number;
  youtubeId: string;
  title: string;
}

export interface Country {
  id: number;
  name: string;
  description: string;
  image: string;
  videos: Video[];
}

// In-memory data
export const destinations: Destination[] = [
  { id: 1, name: 'جزر المالديف', icon: 'fas fa-umbrella-beach' },
  { id: 2, name: 'باريس', icon: 'fas fa-landmark' },
  { id: 3, name: 'سويسرا', icon: 'fas fa-mountain' },
  { id: 4, name: 'دبي', icon: 'fas fa-mosque' },
  { id: 5, name: 'اليابان', icon: 'fas fa-torii-gate' },
  { id: 6, name: 'نيويورك', icon: 'fas fa-city' },
];

export const services: Service[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'رحلات طيران فاخرة',
    description: 'احجز رحلات الطيران على الدرجة الأولى ودرجة رجال الأعمال مع أفضل شركات الطيران العالمية'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'فنادق ومنتجعات فاخرة',
    description: 'تمتع بإقامة لا تُنسى في أفخم الفنادق والمنتجعات حول العالم مع خدمات حصرية'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/843633/pexels-photo-843633.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    title: 'رحلات بحرية فاخرة',
    description: 'استمتع برحلات بحرية على متن أفخم اليخوت والسفن السياحية مع خدمة شخصية متميزة'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'رحلات سفاري فاخرة',
    description: 'عش تجربة سفاري فريدة في أفضل المحميات الطبيعية بإفريقيا مع إقامة في أفخم المخيمات'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'جولات سياحية خاصة',
    description: 'استمتع بجولات سياحية خاصة مع مرشدين متخصصين يتحدثون لغتك ويعرفون أفضل الأماكن'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'خدمات سفر الأعمال',
    description: 'خدمات متكاملة لرجال الأعمال تشمل حجز الرحلات والفنادق وتنظيم المؤتمرات والفعاليات'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    comment: '"تجربة رائعة مع سفر الفخامة! كانت رحلتنا إلى جزر المالديف مثالية بكل المقاييس. الفندق كان فاخرًا والخدمة متميزة والتنظيم احترافي. سأعتمد عليهم حتمًا في رحلاتي القادمة."'
  },
  {
    id: 2,
    name: 'سارة عبدالله',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
    rating: 4.5,
    comment: '"استمتعت كثيرًا برحلتي إلى سويسرا التي نظمتها سفر الفخامة. كانت الترتيبات دقيقة والفنادق فاخرة والبرنامج متنوع ومناسب لاهتماماتي. أنصح بشدة بالتعامل معهم."'
  },
  {
    id: 3,
    name: 'خالد العمري',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    comment: '"كرجل أعمال، أقدر كثيرًا الاحترافية العالية التي يتمتع بها فريق سفر الفخامة. نظموا لي رحلات عمل متعددة إلى دبي ونيويورك ولندن بدقة متناهية. خدمة ممتازة تستحق كل تقدير."'
  }
];

export const countries: Country[] = [
  {
    id: 1,
    name: 'جزر المالديف',
    description: 'مجموعة من الجزر الاستوائية في المحيط الهندي، تشتهر بشواطئها البيضاء الناعمة، ومياهها الفيروزية الصافية، والشعاب المرجانية المذهلة، والمنتجعات الفاخرة.',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&h=600',
    videos: [
      { id: 1, youtubeId: 'lh-FxI4jcJg', title: 'جزر المالديف - جنة على الأرض' },
      { id: 2, youtubeId: 'mX8bbsQf9Y8', title: 'أفضل المنتجعات في المالديف' }
    ]
  },
  {
    id: 2,
    name: 'باريس',
    description: 'عاصمة فرنسا وإحدى أجمل مدن العالم، تشتهر ببرج إيفل، ومتحف اللوفر، وشارع الشانزليزيه، وكاتدرائية نوتردام، والمقاهي الأنيقة، والمطاعم الراقية.',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&h=600',
    videos: [
      { id: 3, youtubeId: 'AQ6GmpMu5L8', title: 'باريس - مدينة النور' },
      { id: 4, youtubeId: '1_XzaHxJMuQ', title: 'جولة في معالم باريس' }
    ]
  },
  {
    id: 3,
    name: 'سويسرا',
    description: 'بلد أوروبي يتميز بجباله الشاهقة، وبحيراته الزرقاء، وقراه الساحرة، ومدنه النظيفة، ومنتجاته عالية الجودة. تشتهر سويسرا بجبال الألب، والساعات الفاخرة، والشوكولاتة اللذيذة.',
    image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&h=600',
    videos: [
      { id: 5, youtubeId: 'linlz7-Pnvw', title: 'سويسرا - جمال الطبيعة' },
      { id: 6, youtubeId: 'A9yorFp2hQI', title: 'رحلة إلى جبال الألب السويسرية' }
    ]
  },
  {
    id: 4,
    name: 'دبي',
    description: 'مدينة عصرية في الإمارات العربية المتحدة، تشتهر بناطحات السحاب الشاهقة، وخاصة برج خليفة، والمراكز التجارية الضخمة، والفنادق الفاخرة، والشواطئ الرملية، ومغامرات الصحراء.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&h=600',
    videos: [
      { id: 7, youtubeId: 'F4vHXqXkCyk', title: 'دبي - مدينة المستقبل' },
      { id: 8, youtubeId: 'hT6LcGlUYIA', title: 'أفضل الأماكن السياحية في دبي' }
    ]
  },
  {
    id: 5,
    name: 'اليابان',
    description: 'بلد في شرق آسيا يجمع بين التقاليد القديمة والتكنولوجيا المتقدمة. تشتهر اليابان بحدائق الكرز، والمعابد التاريخية، والقطارات فائقة السرعة، والمطبخ الياباني المميز.',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&h=600',
    videos: [
      { id: 9, youtubeId: 'jCOsP7pcTAo', title: 'اليابان - بين الأصالة والحداثة' },
      { id: 10, youtubeId: '0nTO4zSEpOs', title: 'رحلة إلى طوكيو وكيوتو' }
    ]
  },
  {
    id: 6,
    name: 'نيويورك',
    description: 'أكبر مدن الولايات المتحدة وأهم مراكزها المالية والثقافية. تشتهر نيويورك بتمثال الحرية، وسنترال بارك، وبرودواي، وتايمز سكوير، وناطحات السحاب، والمتاحف العالمية.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&h=600',
    videos: [
      { id: 11, youtubeId: 'MtCMtC50gwY', title: 'نيويورك - المدينة التي لا تنام' },
      { id: 12, youtubeId: 'XGhwjD2IxWI', title: 'أفضل المطاعم والمتاجر في نيويورك' }
    ]
  }
];
