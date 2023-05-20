package com.deck.users.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.EncodedKeySpec;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Arrays;

@Component
public class KeyUtils {

    @Autowired
    Environment env;

    @Value("${access-token.private}")
    private String accessTokenPrivateKeyPath;

    @Value("${access-token.public}")
    private String accessTokenPublicKeyPath;

    @Value("${refresh-token.private}")
    private String refreshTokenPrivateKeyPath;

    @Value("${refresh-token.public}")
    private String refreshTokenPublicKeyPath;

    private KeyPair _accessTokenKeyPair;
    private KeyPair _refreshTokenKeyPair;

    public KeyPair getAccessTokenKeyPair() {
        if (_accessTokenKeyPair == null) {
            _accessTokenKeyPair = getKeyPair(accessTokenPublicKeyPath, accessTokenPrivateKeyPath);
        }
        return _accessTokenKeyPair;
    }

    public KeyPair getRefreshTokenKeyPair() {
        if (_refreshTokenKeyPair == null) {
            _refreshTokenKeyPair = getKeyPair(refreshTokenPublicKeyPath, refreshTokenPrivateKeyPath);
        }
        return _refreshTokenKeyPair;
    }

    private KeyPair getKeyPair(String refreshTokenPublicKeyPath, String refreshTokenPrivateKeyPath) {
        KeyPair keyPair;

        File publicKeyFile = new File(refreshTokenPublicKeyPath);
        File privateKeyFile = new File(refreshTokenPrivateKeyPath);

        if (privateKeyFile.exists() && publicKeyFile.exists()) {
            KeyFactory keyFactory = null;
            try {
                keyFactory = KeyFactory.getInstance("RSA");

                byte[] publicKeyBytes = Files.readAllBytes(publicKeyFile.toPath());
                EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(publicKeyBytes);
                PublicKey publicKey = keyFactory.generatePublic(publicKeySpec);

                byte[] privateKeyBytes = Files.readAllBytes(privateKeyFile.toPath());
                PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
                PrivateKey privateKey = keyFactory.generatePrivate(privateKeySpec);

                keyPair = new KeyPair(publicKey, privateKey);
            } catch (IOException | InvalidKeySpecException | NoSuchAlgorithmException e) {
                throw new RuntimeException(e);
            }
        } else {
            if (Arrays.stream(env.getActiveProfiles()).anyMatch(s -> s.equals("prod"))) {
                throw new RuntimeException("Public and private keys don't exist");
            }

            File directory = new File("access-refresh-token-keys");
            if (!directory.exists()) {
                directory.mkdirs();
            }
            try {
                KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
                keyPairGenerator.initialize(2048);
                keyPair = keyPairGenerator.generateKeyPair();
                try(FileOutputStream fos = new FileOutputStream((publicKeyFile))) {
                    X509EncodedKeySpec keySpec = new X509EncodedKeySpec((keyPair.getPublic().getEncoded()));
                    fos.write(keySpec.getEncoded());
                }

                try(FileOutputStream fos = new FileOutputStream((privateKeyFile))) {
                    PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec((keyPair.getPrivate().getEncoded()));
                    fos.write(keySpec.getEncoded());
                }
            } catch (NoSuchAlgorithmException | IOException e) {
                throw new RuntimeException(e);
            }
        }

        return keyPair;
    }

    public RSAPublicKey getAccessTokenPublicKey() {
        return (RSAPublicKey) getAccessTokenKeyPair().getPublic();
    }
    public RSAPrivateKey getAccessTokenPrivateKey() {
        return (RSAPrivateKey) getAccessTokenKeyPair().getPrivate();
    }
    public RSAPublicKey getRefreshTokenPublicKey() {
        return (RSAPublicKey) getRefreshTokenKeyPair().getPublic();
    }
    public RSAPrivateKey getRefreshTokenPrivateKey() {
        return (RSAPrivateKey) getRefreshTokenKeyPair().getPrivate();
    }
}
