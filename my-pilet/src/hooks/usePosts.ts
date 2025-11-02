import * as React from 'react';
import { Post } from '../types';

interface State {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Post[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_POST'; payload: Post };

interface TopicTemplate {
  category: string;
  titles: string[];
  bodies: string[];
  accent: string;
}

const TOPIC_TEMPLATES: TopicTemplate[] = [
  {
    category: 'Cuisine',
    titles: [
      'Jollof Rice Wars: Nigeria vs Ghana - The Ultimate Showdown',
      'Top Lagos Street Food Markets To Visit This Weekend',
      'How Abuja Chefs Are Reinventing Traditional Nigerian Soups',
      'Suya Masters Reveal Their Signature Spice Blends',
      'From Farm To Table: Fresh Produce Markets In Ibadan',
    ],
    bodies: [
      'Nigeria keeps the Jollof crown shining bright as chefs across Lagos introduce smoky, slow-roasted twists that pair perfectly with chilled palm wine and live highlife music.',
      'Street food is more than quick bites; it is a cultural exchange. From Agege bread to spicy suya, each delicacy tells the story of the community that perfected it.',
      'Food entrepreneurs are merging indigenous ingredients with modern plating, creating unforgettable culinary experiences that celebrate our heritage.',
    ],
    accent: 'Culinary creatives proudly fly the green-and-white flag with every plate they serve.',
  },
  {
    category: 'Technology',
    titles: [
      'Lagos Tech Hub Attracts New Wave Of Global Investors',
      'Nigerian Startups Close Record-Breaking Funding Rounds',
      'Abuja Innovation Village Champions Home-Grown Solutions',
      'Young Developers Launch Fintech App For Borderless Payments',
      'Tech Education Bootcamps Transform Careers Across Nigeria',
    ],
    bodies: [
      'Nigeria’s innovation ecosystem continues to ripen as founders tackle payments, healthcare, and logistics with unstoppable energy and community-driven collaboration.',
      'Every demo day in Yaba introduces bold ideas that reimagine commerce on the continent, proving that local insight builds resilient technology.',
      'Mentorship collectives and angel networks are empowering fresh graduates to ship production-ready products within months.',
    ],
    accent: 'With each shipped feature, the Naija tech wave gathers more momentum.',
  },
  {
    category: 'Entertainment',
    titles: [
      'Nollywood Breaks Global Box Office Records Again',
      'Afrobeats Superstars Light Up World Festival Stages',
      'Netflix Spotlights New Nigerian Thriller Series',
      'Lagos Fashion Week Returns With Electric Runway Shows',
      'Naija Dancers Set Viral Trends On Social Media',
    ],
    bodies: [
      'The global appetite for Nigerian storytelling keeps expanding, from cinema hits in London to pop-up screenings in Toronto.',
      'Afrobeats producers blend indigenous rhythms with futuristic soundscapes, ensuring every club night from Surulere to Stockholm feels like home.',
      'Creative collectives are redefining how African narratives are shared, welcoming international collaborators without losing authenticity.',
    ],
    accent: 'Spotlights follow the stars, but the heartbeat remains proudly Nigerian.',
  },
  {
    category: 'Culture',
    titles: [
      'Respecting Tradition: Nigerian Festivals Go Global',
      'Modern Takes On Ankara Fashion Dominate Street Style',
      'Ancient Benin Bronzes Inspire New Museum Installations',
      'Reviving Indigenous Languages Through Digital Platforms',
      'How Community Art Projects Are Transforming Port Harcourt',
    ],
    bodies: [
      'From Argungu to Osun-Osogbo, cultural custodians invite the world to witness ceremonies that honour centuries-old legacies.',
      'Designers are remixing aso-oke and adire with sustainable fabrics, crafting garments that travel from Lagos runways to New York pop-ups.',
      'Grassroots initiatives teach younger generations the symbolism behind proverbs, folklore, and traditional crafts.',
    ],
    accent: 'Our heritage thrives when every story is retold with pride.',
  },
];

function buildContentFromTemplate(index: number) {
  const template = TOPIC_TEMPLATES[index % TOPIC_TEMPLATES.length];
  const title = template.titles[index % template.titles.length];
  const bodySource = template.bodies[index % template.bodies.length];
  const body = `${bodySource} ${template.accent}`;

  return { title, body };
}

const FALLBACK_POSTS: Post[] = Array.from({ length: 30 }, (_, index) => {
  const { title, body } = buildContentFromTemplate(index);
  return {
    id: index + 1,
    userId: index % 5,
    title,
    body,
  };
});

const initialState: State = {
  isLoading: true,
  error: null,
  posts: [],
};

function postsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        posts: FALLBACK_POSTS,
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
}

function createThemedPosts(posts: Post[]): Post[] {
  return posts.map((post, index) => {
    const { title, body } = buildContentFromTemplate(index);
    return {
      ...post,
      title,
      body,
    };
  });
}

export function usePosts() {
  const [state, dispatch] = React.useReducer(postsReducer, initialState);

  React.useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      dispatch({ type: 'FETCH_START' });

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error('Unable to fetch posts. Please try again.');
        }

        const rawPosts: Post[] = await response.json();
        const themedPosts = createThemedPosts(rawPosts);

        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: themedPosts });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong while loading posts.';

        if (isMounted) {
          dispatch({ type: 'FETCH_ERROR', payload: message });
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const addPost = React.useCallback((newPostData: { title: string; body: string }) => {
    const newPost: Post = {
      ...newPostData,
      id: Date.now(),
      userId: 0,
    };

    dispatch({ type: 'ADD_POST', payload: newPost });
  }, []);

  return { ...state, addPost };
}
