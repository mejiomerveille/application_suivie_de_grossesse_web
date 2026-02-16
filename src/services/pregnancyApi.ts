const PREGNANCY_API_BASE_URL = process.env.NEXT_PUBLIC_PREGNANCY_API_BASE_URL || 'http://localhost:3001/api';

export interface PregnancyProfile {
  id?: string;
  user_id: string;
  last_menstrual_period: string;
  due_date: string;
  blood_type?: string;
  weight_before_pregnancy?: number;
  medical_history?: string;
  current_week?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DiaryEntry {
  id?: string;
  user_id: string;
  entry_date: string;
  title?: string;
  content: string;
  mood?: string;
  photos?: string[];
  created_at?: string;
}

export interface Symptom {
  id?: string;
  user_id: string;
  symptom_date: string;
  symptom_type: string;
  intensity?: number;
  notes?: string;
  created_at?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  week_min?: number;
  week_max?: number;
  author: string;
  published_date: string;
  image_url?: string;
  read_time?: number;
}

export interface NutritionGuide {
  id: string;
  title: string;
  description: string;
  week_min: number;
  week_max: number;
  recommendations: string[];
  restrictions: string[];
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition_benefits: string[];
  image_url?: string;
  prep_time?: number;
}

export interface ARTutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  week_min?: number;
  week_max?: number;
  ar_content_url: string;
  thumbnail_url?: string;
  duration?: number;
}

export interface Appointment {
  id?: string;
  user_id: string;
  appointment_date: string;
  appointment_type: string;
  doctor_name?: string;
  location?: string;
  notes?: string;
  reminder_sent?: boolean;
}

export interface Notification {
  id?: string;
  user_id: string;
  title: string;
  message: string;
  notification_type: string;
  scheduled_date: string;
  sent?: boolean;
  created_at?: string;
}

export interface Question {
  id?: string;
  user_id: string;
  title: string;
  content: string;
  category?: string;
  answers?: Answer[];
  created_at?: string;
}

export interface Answer {
  id?: string;
  question_id: string;
  user_id: string;
  content: string;
  is_expert?: boolean;
  upvotes?: number;
  created_at?: string;
}

class PregnancyApiService {
  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // ===== PROFIL GROSSESSE =====
  async createProfile(profile: Omit<PregnancyProfile, 'id' | 'user_id'>): Promise<PregnancyProfile> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/profile`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(profile),
    });
    return this.handleResponse<PregnancyProfile>(response);
  }

  async getProfile(): Promise<PregnancyProfile> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/profile`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<PregnancyProfile>(response);
  }

  async updateProfile(profile: Partial<PregnancyProfile>): Promise<PregnancyProfile> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(profile),
    });
    return this.handleResponse<PregnancyProfile>(response);
  }

  async deleteProfile(): Promise<void> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/profile`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  // ===== JOURNAL DE BORD =====
  async createDiaryEntry(entry: Omit<DiaryEntry, 'id' | 'user_id'>): Promise<DiaryEntry> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/diary`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(entry),
    });
    return this.handleResponse<DiaryEntry>(response);
  }

  async getDiaryEntries(): Promise<DiaryEntry[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/diary`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<DiaryEntry[]>(response);
  }

  async getDiaryEntry(id: string): Promise<DiaryEntry> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/diary/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<DiaryEntry>(response);
  }

  async updateDiaryEntry(id: string, entry: Partial<DiaryEntry>): Promise<DiaryEntry> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/diary/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(entry),
    });
    return this.handleResponse<DiaryEntry>(response);
  }

  async deleteDiaryEntry(id: string): Promise<void> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/diary/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  // ===== SYMPTÔMES =====
  async createSymptom(symptom: Omit<Symptom, 'id' | 'user_id'>): Promise<Symptom> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/symptoms`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(symptom),
    });
    return this.handleResponse<Symptom>(response);
  }

  async getSymptoms(): Promise<Symptom[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/symptoms`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Symptom[]>(response);
  }

  async updateSymptom(id: string, symptom: Partial<Symptom>): Promise<Symptom> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/symptoms/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(symptom),
    });
    return this.handleResponse<Symptom>(response);
  }

  async deleteSymptom(id: string): Promise<void> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/symptoms/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  async getSymptomsStatistics(): Promise<any> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/symptoms/statistics`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<any>(response);
  }

  // ===== ARTICLES & CONSEILS =====
  async getArticles(week?: number): Promise<Article[]> {
    const url = week 
      ? `${PREGNANCY_API_BASE_URL}/articles?week=${week}`
      : `${PREGNANCY_API_BASE_URL}/articles`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Article[]>(response);
  }

  async getArticle(id: string): Promise<Article> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/articles/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Article>(response);
  }

  async getArticlesHistory(): Promise<Article[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/articles/history`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Article[]>(response);
  }

  async getArticleCategories(): Promise<string[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/articles/categories`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<string[]>(response);
  }

  // ===== NUTRITION =====
  async getNutritionGuides(week?: number): Promise<NutritionGuide[]> {
    const url = week 
      ? `${PREGNANCY_API_BASE_URL}/nutrition/guides?week=${week}`
      : `${PREGNANCY_API_BASE_URL}/nutrition/guides`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<NutritionGuide[]>(response);
  }

  async getRecipes(): Promise<Recipe[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/nutrition/recipes`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Recipe[]>(response);
  }

  async getRecipe(id: string): Promise<Recipe> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/nutrition/recipes/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Recipe>(response);
  }

  async getNutritionRestrictions(): Promise<any> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/nutrition/restrictions`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<any>(response);
  }

  async saveMealPlan(mealPlan: any): Promise<any> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/nutrition/meal-plan`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(mealPlan),
    });
    return this.handleResponse<any>(response);
  }

  async getMealPlan(): Promise<any> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/nutrition/meal-plan`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<any>(response);
  }

  // ===== TUTORIELS RA =====
  async getARTutorials(): Promise<ARTutorial[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/ar-tutorials/categories`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<ARTutorial[]>(response);
  }

  async getARTutorial(id: string): Promise<ARTutorial> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/ar-tutorials/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<ARTutorial>(response);
  }

  async saveARProgress(progress: any): Promise<any> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/ar-tutorials/progress`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(progress),
    });
    return this.handleResponse<any>(response);
  }

  async getARProgress(): Promise<any> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/ar-tutorials/progress`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<any>(response);
  }

  async getARCategories(): Promise<string[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/ar-tutorials/categories`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<string[]>(response);
  }

  // ===== CALENDRIER =====
  async getMilestones(week?: number): Promise<any[]> {
    const url = week 
      ? `${PREGNANCY_API_BASE_URL}/calendar/milestones?week=${week}`
      : `${PREGNANCY_API_BASE_URL}/calendar/milestones`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<any[]>(response);
  }

  async createAppointment(appointment: Omit<Appointment, 'id' | 'user_id'>): Promise<Appointment> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/calendar/appointments`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(appointment),
    });
    return this.handleResponse<Appointment>(response);
  }

  async getAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/calendar/appointments`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Appointment[]>(response);
  }

  async updateAppointment(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/calendar/appointments/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(appointment),
    });
    return this.handleResponse<Appointment>(response);
  }

  async deleteAppointment(id: string): Promise<void> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/calendar/appointments/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  // ===== NOTIFICATIONS =====
  async createNotification(notification: Omit<Notification, 'id' | 'user_id'>): Promise<Notification> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(notification),
    });
    return this.handleResponse<Notification>(response);
  }

  async getNotifications(): Promise<Notification[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/notifications`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Notification[]>(response);
  }

  async getUpcomingNotifications(): Promise<Notification[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/notifications/upcoming`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Notification[]>(response);
  }

  async updateNotification(id: string, notification: Partial<Notification>): Promise<Notification> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/notifications/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(notification),
    });
    return this.handleResponse<Notification>(response);
  }

  async deleteNotification(id: string): Promise<void> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  async markNotificationSent(id: string): Promise<void> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/notifications/${id}/mark-sent`, {
      method: 'PATCH',
      headers: this.getHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  // ===== QUESTIONS & RÉPONSES =====
  async getFAQ(): Promise<Question[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/qna/faq`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Question[]>(response);
  }

  async getFAQQuestion(id: string): Promise<Question> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/qna/faq/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Question>(response);
  }

  async createQuestion(question: Omit<Question, 'id' | 'user_id'>): Promise<Question> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/qna/questions`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(question),
    });
    return this.handleResponse<Question>(response);
  }

  async getQuestions(): Promise<Question[]> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/qna/questions`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Question[]>(response);
  }

  async getQuestion(id: string): Promise<Question> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/qna/questions/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Question>(response);
  }

  async createAnswer(answer: Omit<Answer, 'id' | 'user_id'>): Promise<Answer> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/qna/answers`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(answer),
    });
    return this.handleResponse<Answer>(response);
  }

  async upvoteAnswer(id: string): Promise<void> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL}/qna/answers/${id}/upvote`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  // ===== SANTÉ DU SERVICE =====
  async healthCheck(): Promise<any> {
    const response = await fetch(`${PREGNANCY_API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET',
      headers: this.getHeaders(false),
    });
    return this.handleResponse<any>(response);
  }
}

export const pregnancyApiService = new PregnancyApiService();