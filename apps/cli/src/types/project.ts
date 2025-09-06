export type ReactStateManagement = 'zustand' | 'jotai' | 'none'
export type ReactRouter = 'react-router' | 'tanstack-router' | 'none'

export type NodeRuntime = 'node20' | 'node22' | 'node24'
export type PackageManager = 'npm' | 'yarn' | 'pnpm'
export type NodeFramework = 'express' | 'koa' | 'fastify' | 'none'

export type ProjectType = 'vue' | 'react' | 'node'
export type BaseFrontendAppType = 'vue' | 'react'
export type BuildTool = 'vite' | 'none'
export type CSSPreprocessor = 'css' | 'less' | 'sass'
export type CSSFramework = 'tailwind' | 'none'
export type StateManagement = ReactStateManagement | boolean
export type Router = ReactRouter | boolean
