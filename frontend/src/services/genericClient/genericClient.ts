import { AxiosError, AxiosResponse } from "axios";
import AxiosInstance from "../../axios/axios";
import { store } from "../../redux/store/Store";
import { logout, refreshToken } from "../../redux/reducers/AuthReducer";

export class GenericClient {

    private instance;
    
    constructor(subPath: string) {
        this.instance = AxiosInstance(subPath)
    }

    private async retryRequest(request: Function, path: string, body?: object) {
        const tokenData = store.getState().auth?.token
        store.dispatch(refreshToken(tokenData))
        return await request(path, body);
    }

    private async withRetrialRequest(request: Function, path: string, body?: object) {
        let response: AxiosResponse;
        try {
            response = await request(path, body);
        } catch(e) {
            if (e instanceof AxiosError && e.response?.status == 401) {
                try {
                    response = await this.retryRequest(request, path, body)
                } catch(e) {
                    store.dispatch(logout())
                }
            }
        }
        return response;
    }

    get(path: string) {
        return this.withRetrialRequest(this.instance.get, path);
    }

    post(path: string, body?: object) {
        return this.withRetrialRequest(this.instance.post, path, body);
    }

    put(path: string, body?: object) {
        return this.withRetrialRequest(this.instance.put, path, body);
    }

    delete(path: string, body?: object) {
        return this.withRetrialRequest(this.instance.delete, path, body);
    }
}
