export interface ProfileDataModel {
    bio: string;
    name: string;
    profile_id: number;
    profile_image: any;
    public_profile_id: string;
    qr_code: string;
    type: number;
    type_title: string;
    theme_id: number;
    theme: ThemeModel;
  }

  export interface ThemeModel {
    added_date: string;
    background_type: number;
    bg_colour: string;
    link_bg: string;
    link_content_colour: string;
    profile_theme_id: number;
    status: number;
    title: string;
  }