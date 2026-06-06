import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 200 },
        { duration: '1m',  target: 400 },
        { duration: '1m',  target: 800 },
        { duration: '1m',  target: 1000 },
        { duration: '30s', target: 0 },
    ],
};

const BASE_URL = 'http://localhost:8080';

export default function loadTest () {
    // lista owners
    http.get(`${BASE_URL}/api/customer/owners`);

    // lista vets
    http.get(`${BASE_URL}/api/vet/vets`);

    // lista visitas de um pet
    http.get(`${BASE_URL}/api/visit/owners/10/pets/12/visits`);

    sleep(1);
}