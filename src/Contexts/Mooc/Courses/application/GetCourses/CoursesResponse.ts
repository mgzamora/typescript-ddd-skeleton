import { Course } from '../../domain/Course';
import { CourseResponse } from '../../../Shared/domain/Courses/application/CourseResponse';
export class CoursesResponse {
    readonly data: CourseResponse[];
     
    constructor(courses: Course[]) {
        this.data = [];
        courses.forEach(course => {
            this.data.push(new CourseResponse(course))
        });        
    }
}
  