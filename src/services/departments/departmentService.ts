import api from "../api";

export interface Member {
  id: string;
  division_id: string;
  name: string;
  photo: string;
  position: string;
  role: string;
}

export interface Division {
  id: string;
  department_id: string;
  division: string;
  slug: string;
  members: Member[];
  department?: {
    id: string;
    department: string;
    slug: string;
  };
}

export interface Department {
  id: string;
  department: string;
  slug: string;
  divisions: Division[];
}

// Type guard for checking department structure
const isDepartment = (obj: unknown): obj is Department => {
  const temp = obj as Record<string, unknown>;
  return (
    !!obj &&
    typeof temp.id === 'string' &&
    typeof temp.department === 'string' &&
    typeof temp.slug === 'string'
  );
};

export const getDepartments = async (): Promise<Department[]> => {
  try {
    const response = await api.get('/departments');
    
    // Ensure response.data is an array
    if (Array.isArray(response.data)) {
      return response.data.filter((dept): dept is Department => isDepartment(dept));
    } else if (response.data && typeof response.data === 'object') {
      // If response.data has a property that contains the array of departments
      const possibleArrayProps = Object.keys(response.data).filter(
        key => Array.isArray((response.data as Record<string, unknown>)[key])
      );
      
      if (possibleArrayProps.length > 0) {
        const departmentsData = (response.data as Record<string, unknown[]>)[possibleArrayProps[0]];
        return departmentsData.filter((dept): dept is Department => isDepartment(dept));
      }
    }
    
    console.error('Unexpected department data format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};

export const getDepartmentBySlug = async (slug: string): Promise<Department | null> => {
  if (!slug || typeof slug !== 'string') {
    console.error('Invalid slug provided to getDepartmentBySlug:', slug);
    return null;
  }

  try {
    const response = await api.get(`/departments/slug/${slug}`);
    
    // Validate the data structure
    if (response.data.data && typeof response.data.data === 'object' && response.data.data.id) {
      const department: Department = { ...response.data.data };
      
      // Make sure divisions is always an array
      if (!Array.isArray(department.divisions)) {
        console.warn(`Department ${slug} has invalid divisions format, using empty array`);
        department.divisions = [];
      }
      
      // Make sure each division has a members array
      department.divisions.forEach((division: Division) => {
        if (!Array.isArray(division.members)) {
          console.warn(`Division ${division.id} has invalid members format, using empty array`);
          division.members = [];
        }
      });
      
      return department;
    }
    
    console.error(`Invalid department data structure for ${slug}:`, response.data);
    return null;
  } catch (error) {
    console.error(`Error fetching department with slug ${slug}:`, error);
    return null;
  }
};

export const getDivisionById = async (id: string): Promise<Division | null> => {
  if (!id || typeof id !== 'string') {
    console.error('Invalid id provided to getDivisionById:', id);
    return null;
  }

  try {
    const response = await api.get(`/divisions/${encodeURIComponent(id.trim())}`);
    
    // Validate the data structure
    if (response.data && typeof response.data === 'object' && response.data.id) {
      const division: Division = { ...response.data };
      
      // Make sure members is always an array
      if (!Array.isArray(division.members)) {
        console.warn(`Division ${id} has invalid members format, using empty array`);
        division.members = [];
      }
      
      return division;
    }
    
    console.error(`Invalid division data structure for ${id}:`, response.data);
    return null;
  } catch (error) {
    console.error(`Error fetching division with id ${id}:`, error);
    return null;
  }
}; 