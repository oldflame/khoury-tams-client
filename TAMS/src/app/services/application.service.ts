import {Injectable} from "@angular/core";

@Injectable()
export class ApplicationService {
  getAllApplications = () =>
    fetch(`localhost:7000/applications`)
      .then(response => response.json())
}
