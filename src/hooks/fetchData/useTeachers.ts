import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';

export type TeacherStatus = 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';

export interface TeacherResponseDataType {
  id: number;
  username: string;
  name: string;
  email: string;
  noTelp: string;
  status?: TeacherStatus;
  createdAt: Date;
}

export function useTeachers() {
  const [data, setData] = useState<TeacherResponseDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await API.get<{ data: any[] }>('/admin/api/teacher/getAll');

        if (!response.data?.data) {
          throw new Error('Data structure not as expected');
        }

        const transformedData = response.data.data.map((teacher) => {
          if (!teacher.id || !teacher.name || !teacher.noTelp) {
            console.warn('Invalid teacher data:', teacher);
          }

          return {
            id: teacher.id,
            username: teacher.User?.username || 'N/A',
            name: teacher.name || 'N/A',
            email: teacher.User?.email || 'N/A',
            noTelp: teacher.noTelp || 'N/A',
            status: teacher.status as TeacherStatus, // 💡 tipe eksplisit
            createdAt: teacher.createdAt ? new Date(teacher.createdAt) : new Date(),
          };
        });

        setData(transformedData);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch teacher data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return { data, loading, error, setError };
}
