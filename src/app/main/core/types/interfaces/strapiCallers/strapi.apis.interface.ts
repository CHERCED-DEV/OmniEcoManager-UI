import { LayoutConfig } from "../common.interface";


//general Response
interface Meta {
    // Puedes añadir propiedades específicas de la parte "meta" si las tienes
}

interface Data {
    id: number;
    attributes: any;
}

export interface CommonApiResponse {
    data: Data;
    meta: Meta;
}

// atributes types
export interface CommonConfig {
    layout: LayoutConfig;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    regex: any;
    error_messages: any;
    localizations: {
        data: any;
    };
}