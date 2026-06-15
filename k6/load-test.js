import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 30 },
        { duration: '2m', target: 60 },
        { duration: '1m', target: 100 },
        { duration: '30s', target: 10 },
    ],
};

const BASE_URL = 'http://localhost:8080';
const JSON_HEADERS = { headers: { 'Content-Type': 'application/json' } };

export default function () {
    // GETs simples
    http.get(`${BASE_URL}/api/customer/owners`);
    http.get(`${BASE_URL}/api/vet/vets`);
    http.get(`${BASE_URL}/api/customer/petTypes`);

    // POST owner
    const ownerId = Math.floor(Math.random() * 10) + 1;
    http.post(`${BASE_URL}/api/customer/owners`, JSON.stringify({
        firstName: 'Test', lastName: 'User',
        address: 'Rua tal', city: 'Cidade tal', telephone: '1234567890'
    }), JSON_HEADERS);

    // Owner e pet ops
    http.get(`${BASE_URL}/api/gateway/owners/${ownerId}`);
    http.get(`${BASE_URL}/api/customer/owners/${ownerId}`);

    const petId = Math.floor(Math.random() * 5) + 1;
    http.post(`${BASE_URL}/api/customer/owners/${ownerId}/pets`, JSON.stringify({
        name: 'K6-Pet', birthDate: '2022-01-01', typeId: 1
    }), JSON_HEADERS);

    // Visits
    http.get(`${BASE_URL}/api/visit/owners/${ownerId}/pets/${petId}/visits`);
    http.post(`${BASE_URL}/api/visit/owners/${ownerId}/pets/${petId}/visits`, JSON.stringify({
        date: '2023-10-27', description: 'Test de consulta'
    }), JSON_HEADERS);
    http.get(`${BASE_URL}/api/visit/pets/visits?petId=${petId}`);

    sleep(1);
}