import axios from "axios";
import { ISimplePost, IComment, Category, IPost } from './shared-interfaces';

const baseApi = axios.create({
  baseURL: "https://youtupia-dev.herokuapp.com/"
});

export const userApi = {
  postSignUp: (nickname: string, email: string, password: string, avatar_url: string) => baseApi.post(`users`, { nickname, email, password, avatar_url },
  ),
  postSignIn: (email: string, password: string) => baseApi.post<{ jwt: string }>(`users/signin`, { email, password }),
}

export const articleApi = {
  getArticles: (category: Category, pageNumber: number) => baseApi.get<ISimplePost[]>(`articles`, { params: { category, pageNumber } }),
  getArticle: (article_id: number) =>
    axios.all<any>([
      baseApi.get<IPost>(`articles/${article_id}`),
      baseApi.get<IComment[]>(`articles/${article_id}/comments`),
      baseApi.get<ISimplePost[]>(`recommendations`)
    ]),
};

